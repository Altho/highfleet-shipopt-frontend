import { IconCircleMinus } from '@tabler/icons';
import { ActionIcon, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  main: {
   color: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '0.1s linear',
    },
  },
}));

export default function Delete({ method }: any) {
 const { classes } = useStyles();
  return (
    <ActionIcon>
      <IconCircleMinus
        className={classes.main}
        size={24}
        onClick={method}
      />
    </ActionIcon>
  );
}
