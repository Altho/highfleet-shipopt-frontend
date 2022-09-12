import { createStyles, Image, NumberInput, RangeSlider, Group } from '@mantine/core';
import { useState } from 'react';
import Delete from './Delete';
import { CreateBadges } from './CreateBadges';
import { Constraint, Module } from '../../types/modules.types';

const useStyles = createStyles((theme) => ({
  additionalInfos: {
    display: 'none',
    width: '100%',
    padding: '10px',
    border: '3px solid white',
    borderRadius: '10px',
    // transition: 'margin 1s linear',

    // height: '300px',
    // backgroundColor: 'red',
    // display: 'contents',

  },
  module: {
    clipPath: 'polygon(0 100%, 0 88%, 1% 78%, 1% 21%, 0 11%, 0 0, 14% 0%, 36% 0, 38% 6%, 48% 6%, 51% 0%, 100% 0, 100% 11%, 100% 88%, 98% 100%, 74% 99%, 73% 93%, 63% 93%, 62% 99%)',
    padding: '10px',
    backgroundImage: theme.colorScheme === 'dark' ? 'url("./rustedmetal.jpg")' : 'url("./concrete2.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow: 'inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)',
  },
  showInfos: {
    // transform: 'scale(1.01)',
    // boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
    display: 'flex',
    transition: 'margin 1s linear',
    marginTop: '0',
    justifyContent: 'center',
  },
  ribbon: {
    width: '9px',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(255,0,0,1) 100%)',
    position: 'absolute',
    boxShadow: '35px -15px 36px -27px rgba(255,0,0,1',
    left: 0,
  },
  numberInput: {
    backgroundColor: theme.colorScheme === 'dark' ? 'grey' : 'white',
  },
  numberDisplay: {
    height: '50px',

  },

  nameDisplay: {
    fontFamily: 'Bungee, sans-serif',
    color: 'white',
    width: '20%',
    marginLeft: '20px',
    padding: '10px',
    webkitTextStrokeWidth: '1px',
    webkitTextStrokeColor: 'black',
    // backgroundImage: "url('./metal.jpg')",
    backgroundSize: 'cover',
    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px',
    // boxShadow: 'gba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 20px 0 20px',
    gap: '5px',
    justifyContent: 'center',
    maxWidth: '50%',
  },
  deleteCell: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'top',
    height: '50px',

  },
  mainInfos: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  moduleContainer: {
    position: 'relative',
  },
  // badge: {
  //   // backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
  //   // color: theme.colorScheme === 'dark' ? 'black' : 'white',
  //   alignItems: 'flex-start',
  // },
  // header: {
  //   backgroundColor: 'rgba(255,255,255,0.2)',
  // },
  // shadow: {
  //   dropShadow: '16px 16px 10px black',
  // },
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
    borderWidth: 0,

  },
}));

type Props = {
  modules: Module[],
  deleteMethod: Function,
  type: string,
};

const SliderImage = ({ path }: any) => {
  const { classes } = useStyles();
  return (
    <Image
      style={{ pointerEvents: 'none', filter: 'drop-shadow(4px 4px 5px black)' }}
      src={`../${path}.svg`}
    />
  );
};

export default function ModulesTable({ modules, deleteMethod, type }: Props) {
  const { classes } = useStyles();
  const [isHovering, setIsHovering] = useState<any>();

  const handleMouseOver = (value: string) => {
    isHovering === value ? setIsHovering(null) : setIsHovering(value);
  };

  const rows = modules.map((module: Module) => (
    <div className={classes.moduleContainer}>
      <div className={classes.ribbon} />
      <div
        key={module.value}
        className={classes.module}
        style={{ backgroundPosition: module.offset }}
      >
        <div
          onClick={() => handleMouseOver(module.value)}
          className={classes.mainInfos}
        >
          <div className={classes.nameDisplay}>
            {module.label}
          </div>
          <div className={classes.badgeContainer}>
            <CreateBadges module={module} />
          </div>

          {type === 'm' ? (<div className={classes.numberDisplay}><NumberInput
            classNames={{ input: classes.numberInput }}
            defaultValue={1}
            min={module.min}
            max={module.max}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
          />
                           </div>)
            :
            <div><RangeSlider
              thumbSize={40}
              label={value => `${value} ${module.units}`}
              min={module.min}
              max={module.max}
              thumbChildren={<SliderImage path={module.value} />, <SliderImage path={module.value} />}
              classNames={{
                root: classes.sliderRoot,
                bar: classes.bar,
                thumb: classes.thumb,
              }}
            />
            </div>}
          <div className={classes.deleteCell}>
            <Delete method={() => deleteMethod(module, type)} />
          </div>
        </div>
      </div>
    </div>
  ));



  return (
    <div className={classes.moduleContainer}>
      {rows}
    </div>
  );
}
