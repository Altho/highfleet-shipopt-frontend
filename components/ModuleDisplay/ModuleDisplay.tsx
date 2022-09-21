import { createStyles, NumberInput, Modal, Badge } from '@mantine/core';
import { useState } from 'react';
import { CreateBadges, getIcon } from '../ModulesTable/CreateBadges';
import Delete from '../ModulesTable/Delete';
import { Module } from '../../types/modules.types';

const useStyles = createStyles((theme) => ({
  additionalInfos: {
    display: 'none',
    width: '100%',
    padding: '10px',
    border: '3px solid white',
    borderRadius: '10px',

  },
  module: {
    // clipPath: 'polygon(0 100%, 0 88%, 1% 78%, 1% 21%, 0 11%, 0 0, 14% 0%, 36% 0, 38% 6%, 48% 6%, 51% 0%, 100% 0, 100% 11%, 100% 88%, 98% 100%, 74% 99%, 73% 93%, 63% 93%, 62% 99%)',
    padding: '10px',
    backgroundImage: theme.colorScheme === 'dark' ? 'url("./rustedmetal.jpg")' : 'url("./concrete2.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
    boxShadow: 'inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)',
  },
  showInfos: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '0.1s linear',
    },
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
    width: '50%',
    marginLeft: '50%',
    transform: 'translateX(-50%)',
    color: 'red',
    display: 'flex',
    // display: 'initial',
  },

  nameDisplay: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // maxWidth: '150px',
    fontFamily: 'Bungee, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    padding: '10px',
    // minWidth: '180px',
    webkitTextStrokeWidth: '1px',
    webkitTextStrokeColor: 'black',
    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)',
    borderRadius: '10px',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 20px 0 20px',
    gap: '5px',
    justifyContent: 'space-around',
  },
  deleteCell: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'top',
    height: '50px',
  },
  mainInfos: {
    width: '100%',
    alignItems: 'center',
  },
  moduleContainer: {
  },

  sliderRoot: {
    width: '40vw',

  },
  bar: {
    backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
  },
  thumb: {
    backgroundColor: theme.colorScheme === 'dark' ? 'transparent' : 'transparent',
    color: theme.colorScheme === 'dark' ? 'black' : 'white',
    borderWidth: 0,

  },
  endContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  startContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  showAmount: {
    fontFamily: 'Bungee, sans-serif',
    fontSize: '2em',
    display: 'flex',
    justifyContent: 'center',
    color: 'darkred',
    padding: '10px',
    webkitTextStrokeWidth: '1px',
    webkitTextStrokeColor: 'black',
    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)',
    borderRadius: '10px',
  },
  moduleHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoBadge: {
    padding: '5px',
    display: 'flex',
    gap: '5px',
    borderRadius: '5px',
    boxShadow: 'inset 7px 5px 15px 3px #000000',
    color: 'white',
    fontFamily: 'Changa, sans serif',
    alignItems: 'center',
  },
}));

type Props = {
  module: Module,
  selectedModules: Module[],
  setSelectedModules: Function,
  deleteMethod: Function,
  visible: boolean,
};

export default function ModuleDisplay({ module,
                                        selectedModules,
                                        setSelectedModules,
                                        deleteMethod,
                                        visible,
                                      }: Props) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState<any>(false);
  const Icon = getIcon(module.group);
  console.log('icon', Icon);

  const handleChange = (e: number | undefined, id: string) => {
    const modules = [...selectedModules];
    const updatedValue = modules.find(
      a => a.value === id
    );
    if (e != null) {
      // @ts-ignore
      updatedValue.amount = e;
    }
    setSelectedModules(modules);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={module.label}
    >
      {/*@ts-ignore*/}
      <div className={classes.badgeContainer}><CreateBadges module={module} /></div>
    </Modal>

    <div className={classes.moduleContainer}>
      <div className={classes.moduleContainer}>
        <div
          key={module.value}
          className={classes.module}
          style={{ backgroundPosition: module.offset }}
        >
          <div>
            <div className={classes.moduleHeader}>
              <div className={classes.infoBadge}>{Icon}{module.group}</div>
              <div className={classes.infoBadge}>${module.cost}</div>
            </div>
          <div
            className={classes.mainInfos}
          >
            <div className={classes.nameDisplay}>
              {module.label}
            </div>

            {!visible ?
              <div className={classes.numberDisplay}>
              <NumberInput
                classNames={{ input: classes.numberInput }}
                defaultValue={1}
                value={module.amount}
                disabled={visible}
                onChange={(e) => handleChange(e, module.value)}
                min={1}
                max={99}
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              />
              </div> :
              <div>
                <div className={classes.showAmount}>{`x${module.amount}`}</div>
              </div>
              }
              <div className={classes.infoContainer}>
              <Badge
                size="xl"
                radius="sm"
                className={classes.showInfos}
                variant="filled"
                color="orange"
                style={{ alignItems: 'center', cursor: 'pointer', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}
                onClick={() => setOpened(true)}
              >Show Infos
              </Badge>
              </div>
            <div className={classes.deleteCell}>
              {!visible && <Delete method={() => deleteMethod(module, 'm')} />
              }
            </div>
          </div>
          </div>
            <div className={classes.badgeContainer}>
              {/* @ts-ignore */}
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
