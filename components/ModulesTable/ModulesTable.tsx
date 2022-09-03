import { createStyles, Table, NumberInput } from "@mantine/core";
import Delete from "./Delete";

const useStyles = createStyles(() => ({
  line: {
    cursor: 'pointer',
  },
}));

export default function ModulesTable({modules, deleteMethod, type}) {
  const { classes } = useStyles();

  const ths = (
    <tr>
      <th>Module</th>
      <th>Amount</th>
    </tr>
  );

  const rows = modules.map((module) => {
    return (
          <tr key={module} className={classes.line}>
            <td>{module}</td>
            <NumberInput width={100} />
            <Delete method={() => deleteMethod(module, type)} />
          </tr>
    );
  });

  return (
    <Table captionSide="bottom" striped highlightOnHover>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
      <tfoot>{ths}</tfoot>
    </Table>
  );

}
