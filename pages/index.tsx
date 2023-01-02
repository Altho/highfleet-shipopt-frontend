import { Container, createStyles, MediaQuery, Button, LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { IconCalculator, IconArrowBack, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import SelectModule from '../components/Select-Module/SelectModule';
import ModulesTable from '../components/ModulesTable/ModulesTable';
import Header from '../components/Layout/Header';
import Title from '../components/Layout/Title';
import {
  Module,
  Constraint,
  ModuleInput,
  ConstraintInput,
  IndexProps,
} from '../types/modules.types';
import { getBackgroundOffset, sendModules } from '../libs/utilities';

export const getStaticProps = async () => {
  const req = await fetch(
    'https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/data'
  );
  const res = await req.json();

  const modulesRes = res.modules;
  const constraintsRes = res.constraints;

  const modules = modulesRes.map(
    (module: ModuleInput): Module => ({
      value: module.id,
      label: module.common_name,
      group: module.type,
      cost: module.cost,
      fuel_cap: module.fuel_cap,
      hp: module.hp,
      squares: module.squares,
      weight: module.weight,
      fuel_rate: module.fuel_rate,
      width: module.width,
      height: module.height,
      thrust: module.thrust,
      firepower: module.firewpower,
      energy: module.energy,
      offset: getBackgroundOffset(),
      amount: 1,
    })
  );

  const constraints = constraintsRes.map(
    (constraint: ConstraintInput): Constraint => ({
      label: constraint.common_name,
      value: constraint.id,
      min: constraint.min,
      max: constraint.max,
      units: constraint.units,
      offset: getBackgroundOffset(),
      range: [20, 80],
    })
  );

  return {
    props: {
      modules,
      constraints,
    },
  };
};

const useStyles = createStyles(() => ({
  mainDiv: {
    backgroundImage:
      'linear-gradient(159deg, rgba(190,163,23,0.664285782672444) 0%, rgba(217,165,43,0) 46%), url(../background.webp)',
    backgroundPosition: 'bottom',
    backgroundSize: '1.5cm',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
    amount: 0,
  },
  container: {
    //backgroundColor: 'rgba(0,0,0,0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    paddingTop: '10px',
    paddingBottom: '50px',
    border: '5px solid grey',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    fontFamily: 'Changa, sans serif',
    marginTop: '20px',
  },
  result: {
    textAlign: 'center',
    fontFamily: 'Changa; sans serif',
    fontSize: '2em',
    color: 'red',
  },
}));

export default function HomePage({ modules, constraints }: IndexProps) {
  const { classes } = useStyles();

  const [moduleList, setModuleList] = useState<any>(modules);
  const [constraintList, setConstraintList] = useState<any>(constraints);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [returnedModules, setReturnedModules] = useState<any>([]);
  const [modulesValue, setModulesValue] = useState<any>();
  const [constraintsValue, setConstraintsValue] = useState<any>();
  const [selectedModules, setSelectedModules] = useState<any[]>([]);
  const [selectedConstraints, setSelectedConstraints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [visible, setVisible] = useState<any>(false);
  const [previousModules, setPreviousModules] = useState<any>([]);
  const [previousConstraints, setPreviousConstraints] = useState<any>([]);
  const [gotResults, setGotResults] = useState<any>(false);

  const handleSelect = (newValue: string, type: string) => {
    if (type === 'm') {
      const returnValueObject = moduleList.find((mod: Module) => mod.value === newValue);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setSelectedModules((selectedModules) => [...selectedModules, returnValueObject]);
      setModuleList(moduleList.filter((module: Module) => module.value !== newValue));
      return;
    }
    const returnValueObject = constraintList.find((mod: Constraint) => mod.value === newValue);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setSelectedConstraints((selectedConstraints) => [...selectedConstraints, returnValueObject]);
    setConstraintList(constraintList.filter((module: Module) => module.value !== newValue));
  };

  const handleSubmit = async () => {
    try {
      setPreviousModules([...selectedModules]);
      setPreviousConstraints([...selectedConstraints]);
      const modulesToSend = selectedModules.reduce((acc, { value, amount }) => {
        acc[value] = amount;
        return acc;
      }, {});

      const constraintsToSend = selectedConstraints.reduce((acc, { value, range }) => {
        acc[value] = { min: range[0], max: range[1] };
        return acc;
      }, {});

      const sendData = {
        modules: modulesToSend,
        constraints: constraintsToSend,
      };
      const sendTime = new Date().getTime();
      setVisible(true);
      setIsLoading(true);
      const data = await sendModules(
        'https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/opt',
        sendData
      );
      setIsLoading(false);
      setVisible(false);
      const receivedTime = new Date().getTime();
      const delay = receivedTime - sendTime;
      if (data.error === 'Infeasible problem') {
        showNotification({
          icon: <IconX />,
          color: 'red',
          autoClose: 5000,
          title: 'Infeasible problem !',
          message:
            'The constraints applied make the problem unsolvable. Please adjust settings and try again',
        });
        return;
      }
      console.log(data.modules);
      const receivedModules = data.modules;
      // const filteredModules = receivedModules.filter((module: any) => module > 0);
      setSelectedModules([]);
      const moduleArray: Module[] = [];
      Object.entries(receivedModules).forEach(([key, amount]) => {
        // @ts-ignore
        if (amount > 0) {
          // @ts-ignore
          moduleArray.push({ name: key, value: amount });
          const returnValueObject = modules.find((mod: any) => mod.value === key);
          if (returnValueObject) {
            if (typeof amount === 'number') {
              returnValueObject.amount = amount;
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-shadow
          setSelectedModules((selectedModules) => [...selectedModules, returnValueObject]);
        }
      });
      setReturnedModules(moduleArray);
      console.log(`Response received in ${delay} ms !`);
      // console.log('total amount',totalAmount(receivedModules));
      // console.log('selected modules', receivedModules);
      setGotResults(true);
      console.log(data);
      // const mapped = receivedModules.map((module: any) => (module));
      // console.log(mapped);
    } catch (error) {
      showNotification({
        icon: <IconX />,
        color: 'red',
        autoClose: 5000,
        title: 'Something went wrong',
        message: "We can't access the server. Check your internet connection and try again",
      });
      setVisible(false);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedModules([]);
    setSelectedConstraints([]);
    setModuleList(modules);
    setConstraintList(constraints);
    setReturnedModules([]);
    setPreviousConstraints([]);
    setPreviousModules([]);
    setGotResults(false);
  };

  const handlePrevious = () => {
    setSelectedConstraints([...previousConstraints]);
    setSelectedModules([...previousModules]);
    setGotResults(false);
  };
  const handleDelete = (module: Module, type: string): void => {
    if (type === 'm') {
      const selectedObject = modules.find((mod) => mod.value === module.value);
      if (selectedObject) {
        setSelectedModules((prevState) =>
          prevState.filter((elem) => elem.value !== selectedObject.value)
        );
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setModuleList((moduleList: Module[]) => [selectedObject, ...moduleList]);
        // setModuleList(moduleList.sort());
        setModulesValue(null);
        return;
      }
    }
    const selectedConstraint = constraints.find((mod) => mod.value === module.value);
    if (selectedConstraint) {
      setSelectedConstraints((prevState) =>
        prevState.filter((elem) => elem.value !== selectedConstraint.value)
      );
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setConstraintList((constraintList: Constraint[]) => [selectedConstraint, ...constraintList]);
      setConstraintsValue(null);
    }
  };

  const SendButton = () => (
    <Button
      leftIcon={<IconCalculator />}
      color="orange"
      className={classes.button}
      onClick={handleSubmit}
    >
      {isLoading ? 'Calculating...' : 'Calculate'}
    </Button>
  );

  const ClearButton = () => (
    <Button leftIcon={<IconX />} color="red" className={classes.button} onClick={handleReset}>
      Clear
    </Button>
  );

  const PreviousButton = () => (
    <Button
      leftIcon={<IconArrowBack />}
      color="blue"
      className={classes.button}
      onClick={handlePrevious}
    >
      Previous
    </Button>
  );

  return (
    <main className={classes.mainDiv}>
      <Header />
      <MediaQuery query="(max-width: 1200px)" styles={{ backgroundColor: 'transparent' }}>
        <Container className={classes.container}>
          <LoadingOverlay visible={visible} overlayBlur={2} />
          {gotResults && <div className={classes.result}>Here are the optimal results</div>}
          <Title type="m">Modules</Title>
          {!gotResults && (
            <SelectModule
              modules={moduleList}
              value={modulesValue}
              handleSelect={handleSelect}
              type="m"
            />
          )}
          <ModulesTable
            modules={selectedModules}
            selectedModules={selectedModules}
            setSelectedModules={setSelectedModules}
            deleteMethod={handleDelete}
            type="m"
            visible={gotResults}
          />
          {!gotResults && <Title type="c">Constraints</Title>}
          {!gotResults && (
            <SelectModule
              modules={constraintList}
              value={constraintsValue}
              handleSelect={handleSelect}
              type="c"
            />
          )}
          {!gotResults && (
            <ModulesTable
              modules={selectedConstraints}
              selectedModules={selectedConstraints}
              setSelectedModules={setSelectedConstraints}
              deleteMethod={handleDelete}
              type="c"
              visible={gotResults}
            />
          )}
          <div className={classes.buttonContainer}>
            {gotResults ? (
              <div className={classes.buttonContainer}>
                <PreviousButton />
                <ClearButton />
              </div>
            ) : (
              <SendButton />
            )}
          </div>
        </Container>
      </MediaQuery>
    </main>
  );
}
