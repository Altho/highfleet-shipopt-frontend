import { createStyles, Select } from "@mantine/core";
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { createContext, useContext, useState } from "react";
import ModulesTable from "../ModulesTable/ModulesTable";
import { IconCirclePlus } from "@tabler/icons";
import { ModuleListTypes } from "../../types/moduleList.types";


const useStyles = createStyles((theme) => ({
  input: {
    // width: '400px',
    marginBottom: theme.spacing.lg,
    height: '50px',
    backgroundColor: theme.colorScheme === 'light' ? '#aeb8c2' : '#485059',
    border: `1px solid ${theme.colorScheme === 'dark' ? '#ff7f2aff' : 'lightgray'}`,
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
    transition: '0.1s linear',

    '&::placeholder': {
      color: theme.colorScheme === 'dark' ? 'white' : 'black',
    },
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'lightgray',
      transition: '0.1s linear',
    },

  },
  icon: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
  },
  dropdown: {
    width: '200px',
    boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`,
    border: `3px solid ${theme.colorScheme === 'dark' ? '#ff7f2aff' : 'lightgray'}`,
  },
  placeholder: {
    color: 'white',
  },
  item: {
    fontFamily: 'Changa, sans serif',
    fontSize: '1.3em',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'lightgray',
      color : 'black',
    },
  },
  rightSection: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
  },
  label: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
  },
  disabled: {
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));




export default function SelectModule({ modules, value, handleSelect, type }) {


  const { classes } = useStyles();
  const returnType = () => type === 'c' ? 'c' : 'm';

  console.log('constraints :', modules);


  return (
    <>
      <Select
        classNames={{
          input: classes.input,
          dropdown: classes.dropdown,
          item: classes.item,
          icon: classes.icon,
          label: classes.label,
          rightSection: classes.rightSection,
          disabled: classes.disabled,
      }}
        disabled={!modules.length}
        searchable
        placeholder={'please select'}
        value={value}
        required
        label={type === 'm' ? 'Select a module' : 'Select a constraint'}
        onChange={(value) => handleSelect(value, returnType())}
        icon={<IconCirclePlus />}
        data={modules}
      />
    </>
  );
}
