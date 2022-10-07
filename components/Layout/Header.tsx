import { Container, createStyles, Button } from '@mantine/core';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

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
  const auth = useKindeAuth();
  const { user } = auth;
  console.log('auth', auth);
  const { classes } = useStyles();
  return (
    <header className={classes.main}>
      <Container>
        <div className={classes.logo}>Highfleet Cogitator</div>
      </Container>
      {!user ? (
        <Link href="/api/auth/login">
          <Button>Sign in</Button>
        </Link>
      ) : (
        <Link href="/api/auth/logout">
          <Button>{user.first_name}, log out ?</Button>
        </Link>
      )}
      {user ? user.first_name : 'please login'}
      <ColorSchemeToggle />
    </header>
  );
}
