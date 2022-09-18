import { Container, createStyles, MediaQuery, Button } from '@mantine/core';
import { useState } from 'react';
import SelectModule from '../components/Select-Module/SelectModule';
import ModulesTable from '../components/ModulesTable/ModulesTable';
import Header from '../components/Layout/Header';
import Title from '../components/Layout/Title';
import { Module, Constraint, ModuleInput, ConstraintInput, IndexProps } from '../types/modules.types';
import { getBackgroundOffset, sendModules } from '../libs/utilities';

export const getStaticProps = async () => {
  const req = await fetch('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/data');
  const res = await req.json();

  const modulesRes = res.modules;
  const constraintsRes = res.constraints;

  const modules =
    modulesRes.map((module: ModuleInput): Module => (
      {
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
      }
    ));

  const constraints =
    constraintsRes.map((constraint: ConstraintInput): Constraint => (
      {
        label: constraint.common_name,
        value: constraint.id,
        min: constraint.min,
        max: constraint.max,
        units: constraint.units,
        offset: getBackgroundOffset(),
        range: [20, 80],
      }
    ));

  return {
    props: {
      modules,
      constraints,
    },
  };
};

const useStyles = createStyles((theme) => ({
  mainDiv: {
    backgroundImage: theme.colorScheme === 'dark' ? 'url(../bg3.png), linear-gradient(to top, #ba8b02, #181818)' : 'url(../bg2_light.svg), url(../bg1_light.svg), linear-gradient(to top, #334d50, #cbcaa5)',
    backgroundPosition: 'bottom',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
    amount: 0,
  },
  container: {
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    paddingTop: '10px',
    paddingBottom: '50px',
  },
}));

export default function HomePage({ modules, constraints }: IndexProps) {
  const { classes } = useStyles();

  const [moduleList, setModuleList] = useState<any>(modules);
  const [constraintList, setConstraintList] = useState<any>(constraints);
  const [returnedModules, setReturnedModules] = useState<any>([]);
  const [modulesValue, setModulesValue] = useState<any>();
  const [constraintsValue, setConstraintsValue] = useState<any>();
  const [selectedModules, setSelectedModules] = useState<any[]>([]);
  const [selectedConstraints, setSelectedConstraints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleSelect = (newValue: string, type: string) => {
    if (type === 'm') {
      const returnValueObject = moduleList.find((mod: Module) => mod.value === newValue);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setSelectedModules(selectedModules => [...selectedModules, returnValueObject]);
      setModuleList(moduleList.filter((module: Module) => module.value !== newValue));
      return;
    }
    const returnValueObject = constraintList.find((mod: Constraint) => mod.value === newValue);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setSelectedConstraints(selectedConstraints => [...selectedConstraints, returnValueObject]);
    setConstraintList(constraintList.filter((module: Module) => module.value !== newValue));
  };

  const handleSubmit = async () => {
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
    // const constraintsToSend = selectedConstraints.map((mod) => {
    //   mod.value: {min: mod.range[0], max: mod.range[1]}
    // })
    // console.log('sending data...');
    const sendTime = (new Date()).getTime();
    setIsLoading(true);
    const data = await sendModules('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/opt', sendData);
    setIsLoading(false);
    const receivedTime = (new Date()).getTime();
    const delay = receivedTime - sendTime;
    console.log(`Response received in ${delay} ms !`);
    console.log(data.modules);
    const receivedModules = data.modules;
    // const filteredModules = receivedModules.filter((module: any) => module > 0);
    console.log('filtered', receivedModules);
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
        setSelectedModules(selectedModules => [...selectedModules, returnValueObject]);
      }
    });
    setReturnedModules(moduleArray);
    // const mapped = receivedModules.map((module: any) => (module));
    // console.log(mapped);
  };
  const handleDelete = (module: Module, type: string): void => {
    if (type === 'm') {
      const selectedObject = modules.find((mod) => mod.value === module.value);
      if (selectedObject) {
        setSelectedModules(prevState => prevState.filter(
          elem => elem.value !== selectedObject.value));
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setModuleList((moduleList: Module[]) => [selectedObject, ...moduleList]);
        // setModuleList(moduleList.sort());
        setModulesValue(null);
        return;
      }
    }
    const selectedConstraint = constraints.find((mod) => mod.value === module.value);
    if (selectedConstraint) {
      setSelectedConstraints(prevState => prevState.filter(
        elem => elem.value !== selectedConstraint.value));
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setConstraintList((constraintList: Constraint[]) => [selectedConstraint, ...constraintList]);
      setConstraintsValue(null);
    }
  };

  return (
    <main className={classes.mainDiv}>
      <Header />
      <MediaQuery
        query="(max-width: 1200px)"
        styles={{ backgroundColor: 'transparent' }}
      >
        <Container className={classes.container}>
          <Title type="m">Modules</Title>
          <SelectModule
            modules={moduleList}
            value={modulesValue}
            handleSelect={handleSelect}
            type="m"
          />
          <ModulesTable modules={selectedModules} selectedModules={selectedModules} setSelectedModules={setSelectedModules} deleteMethod={handleDelete} type="m" />
          <Title type="c">Constraints</Title>
          <SelectModule
            modules={constraintList}
            value={constraintsValue}
            handleSelect={handleSelect}
            type="c"
          />
          <ModulesTable modules={selectedConstraints} selectedModules={selectedConstraints} setSelectedModules={setSelectedConstraints} deleteMethod={handleDelete} type="c" />
          <Button onClick={handleSubmit}>{isLoading ? 'Loading...' : 'Send data'}</Button>
          <div>{returnedModules.map((mod: { name: any; }) => mod.name)}</div>
        </Container>
      </MediaQuery>
    </main>
  );
}
