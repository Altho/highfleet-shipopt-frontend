import { createStyles, Select } from "@mantine/core";
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { createContext, useContext, useState } from "react";
import ModulesTable from "../ModulesTable/ModulesTable";


const useStyles = createStyles((theme) => ({
  input: {
    // width: '400px',
    marginBottom: theme.spacing.lg,
    height: '50px',
  },
  dropdown: {
    width: '200px',
  },
}));




export default function SelectModule({ modules, value, handleSelect, type }) {



  const { classes } = useStyles();
  const returnType = () => type === 'c' ? 'c' : 'm';
  const moduleList: { value: string, label: string }[] = [
    modules.map((module: string) => (
      { value: module, label: module }
    )),
  ];
  console.log('modules', moduleList);
  return (
    <>
      <Select
        classNames={{
          input: classes.input,
          dropdown: classes.dropdown,
      }}
        disabled={!modules.length}
        searchable
        placeholder={'please select'}
        value={value}
        onChange={(value: string) => handleSelect(value, returnType())}
        data={moduleList[0]}
      />
    </>
  );
}
