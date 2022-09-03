import { createStyles } from '@mantine/core';
import { IconUnlink, IconHexagons } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  main: {
    // width: '400px',
    display: 'flex',
    justifyContent: 'flex-start',
    fontFamily: 'Changa, sans serif',
    fontSize: '2.5em',
    // padding: '10px 10px 10px ',
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor: theme.colorScheme === 'dark' ? '#2b2b2b' : 'lightgrey',
    boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
  },
  title: {
    backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'white',
    color: 'black',
    padding: '0px 10px',
    alignItems: 'center',
    display: 'flex',
    gap: '15px',
  },
  chevron: {
    clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 100%, 0 50%, 0 0)',
    width: '50px',
    backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'white',
  },
}));

export default function Title({children, type}) {
  const { classes } = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.title}>
        {type === 'm' ? <IconHexagons size={32} /> : <IconUnlink size={32} />}
        {children}
      </div>
      <span className={classes.chevron} />
    </div>
  );
}
