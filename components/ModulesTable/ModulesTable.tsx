import { createStyles, Table, NumberInput } from "@mantine/core";

const useStyles = createStyles(() => ({
  line: {
    cursor: 'pointer',
  },
}));

export default function ModulesTable({modules}) {
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
            <NumberInput width={100}/>
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
