import { createStyles, Image, Table, NumberInput, Badge, Slider, RangeSlider, Group } from "@mantine/core";
import Delete from './Delete';
import { IconGasStation, IconRocket, IconCurrencyDollar, IconSword } from "@tabler/icons";
import { useState } from "react";
import { CreateBadges } from "./CreateBadges";

const useStyles = createStyles((theme, _params, getRef) => ({
  additionalInfos: {
    display: 'none',
    width: '100%',
    padding: '10px',
    overflowX: 'visible',
    // height: '300px',
    // backgroundColor: 'red',
    // display: 'contents',

  },
  showInfos: {
      // transform: 'scale(1.01)',
      // boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
      display: 'block',
  },
  mainTable: {
    width: '100%',
    tableLayout: 'auto',
  },
  mainRow: {
    width: '100%',

  },
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
    // backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
    // color: theme.colorScheme === 'dark' ? 'black' : 'white',
    alignItems: 'flex-start',
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
  const [isHovering, setIsHovering] = useState();

  const handleMouseOver = (value) => {
    isHovering === value ? setIsHovering(null): setIsHovering(value)  ;
  };



  const ths = (
    <tr>
      <th>{type === 'm' ? 'Modules' : 'Constraints'}</th>
      <th>Amount</th>
      <th>Remove</th>
    </tr>
  );

  const rows = modules.map((module) => (
 <>
    <tr key={module.value}
        className={classes.line}>
            <td
              className={classes.nameDisplay}
              onClick={() => handleMouseOver(module.value)}
            >
              <div>{module.label}</div>
            </td>
            {/* eslint-disable-next-line max-len */}
            {type === 'm' ? (<td><NumberInput
              classNames={{ input: classes.numberInput }}
              defaultValue={1}
              min={module.min}
              max={module.max}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            />
                             </td>)
              :
              <td><RangeSlider
                thumbSize={40}
                label={value => `${value} ${module.units}`}
                min={module.min}
                max={module.max}
                thumbChildren={module.value === 'twr' ?( <DarkRocket />, <DarkRocket/> )
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
  <div className={classes.mainRow}>
    <div className={`${classes.additionalInfos} ${isHovering === module.value ? classes.showInfos : ''}`}>
     <Group>
       <CreateBadges module={module} />
     </Group>
    </div>
  </div>
 </>

    ));

  return (
    <Table className={classes.mainTable} captionSide="bottom" striped highlightOnHover>
      <thead className={classes.header}>{modules.length ? ths : null}</thead>
      <tbody className={classes.mainTable}>{rows}</tbody>
    </Table>
  );
}

const DarkRocket = () => {
  return (
    <Image style={{pointerEvents: 'none', filter: 'drop-shadow(4px 4px 5px black)'}} src={'./dark_rocket2.svg'}/>
  )
};


