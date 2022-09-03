import { Select } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import SelectModule from '../components/Select-Module/SelectModule';
import { useState } from "react";
import ModulesTable from "../components/ModulesTable/ModulesTable";

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

export default function HomePage({ modules, constraints }) {

  const [modulesValue, setModulesValue] = useState();
  const [constraintsValue, setConstraintsValue] = useState();
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedConstraints, setSelectedConstraints] = useState([]);


  const handleSelect = (newValue: string, type: string) => {
    const moduleIndex = modules.indexOf(newValue);
    console.log('type', type);
    if (type === 'm') {
      setSelectedModules(selectedModules => [...selectedModules, newValue]);
      modules.splice(moduleIndex, moduleIndex + 1);
      return;
    }
    setSelectedConstraints(selectedConstraints => [...selectedConstraints, newValue]);
    constraints.splice(moduleIndex, moduleIndex + 1);

  };

return (
  <>
    <h1>Modules :</h1>
    <SelectModule
      modules={modules}
      value={modulesValue}
      handleSelect={handleSelect}
      type={'m'}
    />
    <ModulesTable modules={selectedModules} />
    <h1>Constraints :</h1>
    <SelectModule
      modules={constraints}
      value={constraintsValue}
      handleSelect={handleSelect}
      type={'c'}
    />
    <ModulesTable modules={selectedConstraints} />
    <ColorSchemeToggle />
  </>
);
}
