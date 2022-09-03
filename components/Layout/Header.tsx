import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  main: {
    // width: '400px',
    height: '50px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function Header() {
  const { classes } = useStyles();
  return (
    <header className={classes.main}>
      <ColorSchemeToggle />
    </header>
  );
}
