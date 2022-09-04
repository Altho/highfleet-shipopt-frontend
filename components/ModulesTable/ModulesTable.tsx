import { createStyles, Table, NumberInput, Badge } from "@mantine/core";
import Delete from "./Delete";

const useStyles = createStyles((theme) => ({
  line: {
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
    '&:hover': {
      // transform: 'scale(1.01)',
      // boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
      borderLeft: `4px solid ${theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black'}`,
      backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255, 127, 42, 1)' : 'rgba(255,255,255,0.4)',

    },
  },
  numberInput: {
    backgroundColor: theme.colorScheme === 'dark' ? 'grey' : 'white',
  },
  nameDisplay: {
    width: '80%',
    fontFamily: 'Changa, sans-serif',
  },
  deleteCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
  },
  badge: {
    backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
    color: theme.colorScheme === 'dark' ? 'black' : 'white',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

export default function ModulesTable({modules, deleteMethod, type}) {
  const { classes } = useStyles();

  const ths = (
    <tr>
      <th>{type === 'm' ? 'Modules' : 'Constraints'}</th>
      <th>Amount</th>
      <th>Remove</th>
    </tr>
  );

  const rows = modules.map((module) => {
    return (
          <tr key={module} className={classes.line}>
            <td className={classes.nameDisplay}>
              <Badge
                className={classes.badge}
                variant="filled"
                size="xl"
                radius="sm"
              >
                {module}
              </Badge>
            </td>
            {/* eslint-disable-next-line max-len */}
            <td><NumberInput
              classNames={{input: classes.numberInput}}
              defaultValue={1}
              min={1}
              max={99}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
            </td>
            {/* eslint-disable-next-line max-len */}
            <td className={classes.deleteCell}><Delete method={() => deleteMethod(module, type)} /></td>
          </tr>
    );
  });

  return (
    <Table captionSide="bottom" striped highlightOnHover>
      <thead className={classes.header}>{modules.length ? ths : null}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );

}
