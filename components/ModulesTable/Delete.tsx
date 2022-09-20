import { IconCircleMinus } from '@tabler/icons';
import { ActionIcon, createStyles, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  main: {
   marginTop: '10px',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '0.1s linear',
    },
  },
}));

export default function Delete({ method }: any) {
 const { classes } = useStyles();
  return (
    <Badge
      className={classes.main}
      variant={'filled'}
      color={'red'}
      size={'lg'}
      radius={'xl'}
      onClick={method}
    >
      Delete
    </Badge>
  );
}
