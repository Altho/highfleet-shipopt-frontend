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

export default function Title() {
  const { classes } = useStyles();

  return (
    <div>Hello</div>
  )
}
