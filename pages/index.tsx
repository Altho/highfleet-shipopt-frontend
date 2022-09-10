import { Container, createStyles, Select, MediaQuery, Button } from "@mantine/core";
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import SelectModule from '../components/Select-Module/SelectModule';
import { useState } from "react";
import ModulesTable from "../components/ModulesTable/ModulesTable";
import Header from "../components/Layout/Header";
import Title  from "../components/Layout/Title";
import { ModuleListTypes } from "../types/moduleList.types";

export const getServerSideProps = async () => {
  const req = await fetch('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/');
  const res = await req.json();

  const { modules, constraints } = res;

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
  },
  container: {
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    paddingTop: '10px',
    paddingBottom: '50px',
  }
}));

export default function HomePage({ modules, constraints }) {
  const { classes } = useStyles();

  const moduleObject =
    modules.map((module) => (
      { value: module.id,
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
      }
    ));

  const constraintObject =
    constraints.map((constraint) => (
      {
        label: constraint.common_name,
        value: constraint.id,
        min: constraint.min,
        max: constraint.max,
        units: constraint.units,
      }
    ));

  const [moduleList, setModuleList] = useState(moduleObject);
  const [constraintList, setConstraintList] = useState(constraintObject);
  const [modulesValue, setModulesValue] = useState();
  const [constraintsValue, setConstraintsValue] = useState();
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedConstraints, setSelectedConstraints] = useState([]);


  const handleSelect = (newValue: string, type: string) => {


    if (type === 'm') {
      const returnValueObject = moduleList.find((mod) => mod.value === newValue);
      setSelectedModules(selectedModules => [...selectedModules, returnValueObject]);
      setModuleList(moduleList.filter((module) => module.value !== newValue));
      console.log(selectedModules);
      return;
    }
    const returnValueObject = constraintList.find((mod) => mod.value === newValue);
    setSelectedConstraints(selectedConstraints => [...selectedConstraints, returnValueObject]);
    setConstraintList(constraintList.filter((module) => module.value !== newValue));
  };

  const handleSubmit = () => {
    console.log(selectedModules);
    console.log(selectedConstraints);
  }

  const handleDelete = (module, type) => {

    if (type === 'm') {
      const selectedObject = moduleObject.find((mod) => mod.value === module.value);
      setSelectedModules(prevState => prevState.filter(elem => elem.value !== selectedObject.value));
      setModuleList(moduleList => [selectedObject, ...moduleList]);
      // setModuleList(moduleList.sort());
      setModulesValue(null);
      return;
    }
    const selectedConstraint = constraintObject.find((mod) => mod.value === module.value);
    setSelectedConstraints(prevState => prevState.filter(elem => elem.value !== selectedConstraint.value));
    setConstraintList(constraintList => [selectedConstraint, ...constraintList]);
    setConstraintsValue(null);

  };

return (
  <main className={classes.mainDiv}>
    <Header />
    <MediaQuery
      query="(max-width: 1200px)"
      styles={{ backgroundColor: 'transparent' }}
    >
    <Container className={classes.container}>
    <Title type='m'>Modules</Title>
    <SelectModule
      modules={moduleList}
      value={modulesValue}
      handleSelect={handleSelect}
      type={'m'}
    />
    <ModulesTable modules={selectedModules} deleteMethod={handleDelete} type="m" />
      <Title type='c'>Constraints</Title>
    <SelectModule
      modules={constraintList}
      value={constraintsValue}
      handleSelect={handleSelect}
      type={'c'}
    />
    <ModulesTable modules={selectedConstraints} deleteMethod={handleDelete} type="c" />
      <Button onClick={handleSubmit}>Log request</Button>
    </Container>
    </MediaQuery>
  </main>
);
}
