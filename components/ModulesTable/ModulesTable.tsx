import { createStyles, Table, NumberInput } from "@mantine/core";
import Delete from "./Delete";

const useStyles = createStyles((theme) => ({
  line: {
    cursor: 'pointer',
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
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
    alignItems: 'baseline',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

export default function ModulesTable({modules, deleteMethod, type}) {
  const { classes } = useStyles();

  const ths = (
    <tr>
      <th>Module</th>
      <th>Amount</th>
      <th>Remove</th>
    </tr>
  );

  const rows = modules.map((module) => {
    return (
          <tr key={module} className={classes.line}>
            <td className={classes.nameDisplay}>{module}</td>
            {/* eslint-disable-next-line max-len */}
            <td><NumberInput classNames={{input: classes.numberInput}} /></td>
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
