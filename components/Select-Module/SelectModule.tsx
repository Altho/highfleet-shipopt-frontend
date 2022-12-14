import { createStyles, Select } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import { Module } from '../../types/modules.types';

const useStyles = createStyles((theme) => ({
  input: {
    // width: '400px',
    marginBottom: theme.spacing.lg,
    height: '50px',
    backgroundColor: '#485059',
    border: '1px solid #ff7f2aff',
    color: 'white',
    transition: '0.1s linear',

    '&::placeholder': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: '#ff7f2aff',
      transition: '0.1s linear',
    },

  },
  icon: {
    color: 'white',
  },
  dropdown: {
    width: '200px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    border: '3px solid #ff7f2aff',
  },
  placeholder: {
    color: 'white',
  },
  item: {
    fontFamily: 'Changa, sans serif',
    fontSize: '1.3em',

    '&:hover': {
      backgroundColor: '#ff7f2aff',
      color: 'black',
    },
  },
  rightSection: {
    color: 'white',
  },
  label: {
    color: 'white',
  },
  disabled: {
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));

type Props = {
  modules: Module[],
  value: string,
  handleSelect: Function,
  type: string,
};

export default function SelectModule({ modules, value, handleSelect, type }: Props) {
  const { classes } = useStyles();
  const returnType = () => type === 'c' ? 'c' : 'm';

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
        placeholder="please select"
        value={value}
        required
        label={type === 'm' ? 'Select a module' : 'Select a constraint'}
        /* eslint-disable-next-line @typescript-eslint/no-shadow */
        onChange={(value) => handleSelect(value, returnType())}
        icon={<IconCirclePlus />}
        data={modules}
      />
    </>
  );
}
