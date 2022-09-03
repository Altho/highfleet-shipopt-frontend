import { Container, createStyles, Select } from "@mantine/core";
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import SelectModule from '../components/Select-Module/SelectModule';
import { useState } from "react";
import ModulesTable from "../components/ModulesTable/ModulesTable";
import Header from "../components/Layout/Header";
import Title  from "../components/Layout/Title";

export const getServerSideProps = async () => {
  const req = await fetch('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/');
  const res = await req.json();

  const { modules, constraints } = res;

  console.log('moduuuules', modules);

  return {
    props: {
      modules,
      constraints,
    },
  };
};

const useStyles = createStyles((theme) => ({
  mainDiv: {
    backgroundImage: theme.colorScheme === 'dark' ? 'url(../bg2.svg), url(../bg1.svg), linear-gradient(to top, #ba8b02, #181818)' : 'url(../bg2_light.svg), url(../bg1_light.svg), linear-gradient(to top, #334d50, #cbcaa5)',
    backgroundPosition: 'bottom',
    backgroundSize: 'contain',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
  },
  container: {
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)',
    paddingTop: '10px',
    paddingBottom: '50px',
  }
}));

export default function HomePage({ modules, constraints }) {
  const { classes } = useStyles();


  const [modulesValue, setModulesValue] = useState();
  const [constraintsValue, setConstraintsValue] = useState();
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedConstraints, setSelectedConstraints] = useState([]);


  const handleSelect = (newValue: string, type: string) => {
    const moduleIndex = modules.indexOf(newValue);
    const constraintsIndex = constraints.indexOf(newValue);
    console.log('type', type);
    if (type === 'm') {
      setSelectedModules(selectedModules => [...selectedModules, newValue]);
      modules.splice(moduleIndex, moduleIndex + 1);
      return;
    }
    setSelectedConstraints(selectedConstraints => [...selectedConstraints, newValue]);
    constraints.splice(constraintsIndex, constraintsIndex + 1);
  };

  const handleDelete = (module, type) => {
    console.log('triggered', module,type);
    if (type === 'm') {
      setSelectedModules(prevState => prevState.filter(elem => elem !== module));
      modules.push(module);
      modules.sort();
      return;
    }
    setSelectedConstraints(prevState => prevState.filter(elem => elem !== module));
    constraints.push(module);
    constraints.sort();
  };

return (
  <main className={classes.mainDiv}>
    <Header />
    <Container className={classes.container}>
    <Title type='m'>Modules</Title>
    <SelectModule
      modules={modules}
      value={modulesValue}
      handleSelect={handleSelect}
      type={'m'}
    />
    <ModulesTable modules={selectedModules} deleteMethod={handleDelete} type="m" />
      <Title type='c'>Constraints</Title>
    <SelectModule
      modules={constraints}
      value={constraintsValue}
      handleSelect={handleSelect}
      type={'c'}
    />
    <ModulesTable modules={selectedConstraints} deleteMethod={handleDelete} type="c" />
    </Container>
  </main>
);
}
