import { Container, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  main: {
    // width: '400px',
    height: '50px',
    padding: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    fontFamily: 'Bungee, sans serif',
    fontSize: '2.5rem',
    textShadow: '2px 8px 6px rgba(0,0,0,0.2), 0px -5px 35px rgba(255,255,255,0.3)',
  },
}));

export default function Header() {
  const { classes } = useStyles();
  return (
    <header className={classes.main}>
      <Container>
        <div className={classes.logo}>Highfleet Cogitator</div>
      </Container>
    </header>
  );
}
