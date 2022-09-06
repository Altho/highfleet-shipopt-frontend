import { createStyles, Image, Table, NumberInput, Badge, Slider, RangeSlider } from "@mantine/core";
import Delete from './Delete';
import { IconGasStation, IconRocket } from "@tabler/icons";

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
  shadow: {
    dropShadow: '16px 16px 10px black',
  },
  sliderRoot: {
    width: '40vw',
  },
  bar: {
    backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
  },
  thumb: {
    backgroundColor: theme.colorScheme === 'dark' ? 'transparent' : 'transparent',
    // border: theme.colorScheme === 'dark' ? 'black 3px solid' : 'darkgrey 3px solid',
    color: theme.colorScheme === 'dark' ? 'black' : 'white',
    borderWidth:0,
  },
  svg: {
    backgroundColor: 'orange',
    fill: 'orange',
  },
}));

export default function ModulesTable({ modules, deleteMethod, type }) {
  const { classes } = useStyles();

  const ths = (
    <tr>
      <th>{type === 'm' ? 'Modules' : 'Constraints'}</th>
      <th>Amount</th>
      <th>Remove</th>
    </tr>
  );

  const rows = modules.map((module) => (
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
            {type === 'm' ? (<td><NumberInput
              classNames={{ input: classes.numberInput }}
              defaultValue={1}
              min={1}
              max={99}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
                             </td>)
              :
              <td><RangeSlider
                thumbSize={40}
                thumbChildren={module === 'twr' ?( <DarkRocket />, <DarkRocket/> )
                  :
                 ( <IconGasStation size={40} key={1} />, <IconGasStation size={40} key={1} />)
                }
                classNames={{
                  root: classes.sliderRoot,
                  bar: classes.bar,
                  thumb: classes.thumb,
                }}
              />
              </td> }
            {/* eslint-disable-next-line max-len */}
            <td className={classes.deleteCell}><Delete method={() => deleteMethod(module, type)} /></td>
          </tr>
    ));

  return (
    <Table captionSide="bottom" striped highlightOnHover>
      <thead className={classes.header}>{modules.length ? ths : null}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

const DarkRocket = () => {
  return (
    <Image style={{pointerEvents: 'none', filter: 'drop-shadow(4px 4px 5px black)'}} src={'./dark_rocket2.svg'}/>
  )
};
