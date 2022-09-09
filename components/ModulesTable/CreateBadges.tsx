import {
  IconCurrencyDollar,
  IconShieldHalfFilled,
  IconSword,
  IconUfo,
  IconParachute,
  IconEngine,
  IconEye,
  IconBarrel,
  IconGasStation,
  IconActivity,
  IconArrowTopTail,
  IconSquare,
  IconBarbell,
  IconUsers,
  IconGauge,
  IconRuler2,
  IconRocket,
  IconStar,
  IconBolt,
  IconTower, IconFriends


} from "@tabler/icons";
import { Badge, createStyles, Tooltip } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  badgeType: {
    // backgroundColor: theme.colorScheme === 'dark' ? '#ff7f2aff' : 'black',
    // color: theme.colorScheme === 'dark' ? 'black' : 'white',
    alignItems: 'flex-start',
  },
}));

const getIcon = (group) => {
  switch (group) {
    case "Offense":
      return <IconSword />;
      break;
    case "Ship":
      return <IconUfo />;
      break;
    case "Defense":
      return <IconShieldHalfFilled />;
      break;
    case "Safety":
      return <IconParachute />;
      break;
    case "Engines":
      return <IconEngine />;
      break;
    case "Sensors":
      return <IconEye />;
      break;
  }
};

export const CreateBadges = ({ module }) => {
  const { classes } = useStyles();
  const objectArray = [];
  Object.keys(module).forEach((key, index) => {
    objectArray.push({ id: key, value: module[key] });
  });
  console.log('moduleObject attemp', objectArray);

  return (
    objectArray.map((mod) => {
      if (mod.id === 'group' && mod.id) {
        const Icon = getIcon(mod.value);
        return (
          <Tooltip label="Type">
          <Badge
          className={classes.badgeType}
          variant="filled"
          size="lg"
          leftSection={Icon}
          radius="sm"
        >
          {mod.value}
               </Badge>
          </Tooltip>
      );
      }

      if (mod.id === 'cost' && mod.value > 0) {
          return (
            <Tooltip label="Cost">
              <Badge
                className={classes.badgeType}
                variant="filled"
                color="green"
                size="lg"
                leftSection={<IconCurrencyDollar />}
                radius="sm"
              >
                {mod.value}
              </Badge>
            </Tooltip>
          );
        }

      if (mod.id === 'fuel_cap' && mod.value > 0) {
        return (
          <Tooltip label="Fuel Cap">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="yellow"
              size="lg"
              leftSection={<IconBarrel />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'hp' && mod.value > 0) {
        return (
          <Tooltip label="hp">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="pink"
              size="lg"
              leftSection={<IconActivity />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'squares' && mod.value > 0) {
        return (
          <Tooltip label="Squares">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="gray"
              size="lg"
              leftSection={<IconSquare />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'weight' && mod.value > 0) {
        return (
          <Tooltip label="Weight">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="red"
              size="lg"
              leftSection={<IconBarbell />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'crew' && mod.value > 0) {
        return (
          <Tooltip label="Crew">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="grape"
              size="lg"
              leftSection={<IconFriends />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'fuel_rate' && mod.value > 0) {
        return (
          <Tooltip label="Fuel rate">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="lime"
              size="lg"
              leftSection={<IconGauge />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'width' && mod.value > 0) {
        return (
          <Tooltip label="Width">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="cyan"
              size="lg"
              leftSection={<IconRuler2 />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'thrust' && mod.value > 0) {
        return (
          <Tooltip label="Thrust">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="Orange"
              size="lg"
              leftSection={<IconRocket />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'firepower' && mod.value > 0) {
        return (
          <Tooltip label="Firepower">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="yellow"
              size="lg"
              leftSection={<IconStar />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'energy' && mod.value > 0) {
        return (
          <Tooltip label="Energy">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="indigo"
              size="lg"
              leftSection={<IconBolt />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }

      if (mod.id === 'height' && mod.value > 0) {
        return (
          <Tooltip label="Height">
            <Badge
              className={classes.badgeType}
              variant="filled"
              color="red"
              size="lg"
              leftSection={<IconTower />}
              radius="sm"
            >
              {mod.value}
            </Badge>
          </Tooltip>
        );
      }
    }));
};

// moduleObject().map((mod) => {
//   console.log(mod);
// });
