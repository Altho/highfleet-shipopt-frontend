import { IconCircleMinus } from "@tabler/icons";
import { ActionIcon } from '@mantine/core';

export default function Delete({method}) {
  return (
    <ActionIcon>
      <IconCircleMinus
        size={24}
        onClick={method}
      />
    </ActionIcon>
  );
}
