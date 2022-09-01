import { createStyles, Select } from "@mantine/core";
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const useStyles = createStyles((theme) => ({
  input: {
    width: '400px',
    margin: theme.spacing.lg,
  },
  dropdown: {
    width: '200px',
  },
}));

export default function SelectModule({ modules }) {
  const { classes } = useStyles();
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
        searchable
        data={moduleList[0]}
      />
    </>
  );
}
