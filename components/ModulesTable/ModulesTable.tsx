import { createStyles, SimpleGrid } from '@mantine/core';
import { Module } from '../../types/modules.types';
import ModuleDisplay from '../ModuleDisplay/ModuleDisplay';
import ConstraintDisplay from '../ConstraintDisplay/ConstraintDisplay';

const useStyles = createStyles((theme) => ({
  additionalInfos: {
    display: 'none',
    width: '100%',
    padding: '10px',
    border: '3px solid white',
    borderRadius: '10px',

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
    backgroundSize: 'cover',
    textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px',
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
}));

type Props = {
  modules: Module[],
  deleteMethod: Function,
  selectedModules: any,
  setSelectedModules: any,
  type: string
  visible: any
};

export default function ModulesTable({ modules,
                                       deleteMethod,
                                       selectedModules,
                                       setSelectedModules,
                                       type,
                                       visible,
                                     }: Props) {
  const { classes } = useStyles();

  // @ts-ignore
  if (type === 'm') {
    return (
      <div className={classes.moduleContainer}>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          {modules.map((mod) => (
              <ModuleDisplay
                module={mod}
                selectedModules={selectedModules}
                setSelectedModules={setSelectedModules}
                deleteMethod={deleteMethod}
                visible={visible}
              />
            )
          )
          }
        </SimpleGrid>
      </div>
    );
  }
  return (
    <div className={classes.moduleContainer}>
    {
      modules.map((mod) => (
        <ConstraintDisplay
          /* @ts-ignore */
          constraint={mod}
          selectedConstraint={selectedModules}
          setSelectedConstraint={setSelectedModules}
          deleteMethod={deleteMethod}
        />))
    }
    </div>
    );
}
