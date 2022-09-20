import { createStyles, RangeSlider, Image } from '@mantine/core';
import { SetStateAction, useState } from 'react';
import { Constraint } from '../../types/modules.types';
import Delete from '../ModulesTable/Delete';

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
  constraint: Constraint
  selectedConstraint: Constraint[]
  setSelectedConstraint: Function
  deleteMethod: Function
};

export default function ConstraintDisplay({
                                            constraint,
                                            selectedConstraint,
                                            setSelectedConstraint,
                                            deleteMethod,
                                          }: Props) {
  const { classes } = useStyles();

  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleChange = (rangeValue: SetStateAction<[number, number]>, id: string) => {
    setRangeValue(rangeValue);
    const constraints = [...selectedConstraint];
    const updatedValue = constraints.find(
      a => a.value === id
    );
    if (updatedValue) {
      // @ts-ignore
      updatedValue.range = rangeValue;
      setSelectedConstraint(constraints);
      console.log(selectedConstraint);
    }
  };

  const SliderImage = ({ path }: any) => (
      <Image
        style={{ pointerEvents: 'none', filter: 'drop-shadow(4px 4px 5px black)' }}
        src={`../${path}.svg`}
      />
    );

  // @ts-ignore
  // @ts-ignore
  return (
    <div className={classes.moduleContainer}>
      <div className={classes.moduleContainer}>
        <div className={classes.ribbon} />
        <div
          key={constraint.value}
          className={classes.module}
          style={{ backgroundPosition: constraint.offset }}
        >
          <div
            className={classes.mainInfos}
          >
            <div className={classes.nameDisplay}>
              {constraint.label}
            </div>
            <div><RangeSlider
              thumbSize={40}
              label={value => `${value} ${constraint.units}`}
              min={constraint.min}
              max={constraint.max}
              value={constraint.range}
              /* eslint-disable-next-line @typescript-eslint/no-shadow */
              onChange={(rangeValue) => handleChange(rangeValue, constraint.value)}
              thumbChildren={<SliderImage path={constraint.value} />}
              classNames={{
                root: classes.sliderRoot,
                bar: classes.bar,
                thumb: classes.thumb,
              }}
            />
            </div>
            <div className={classes.deleteCell}>
              <Delete method={() => deleteMethod(constraint, 'c')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
