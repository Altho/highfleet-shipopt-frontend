import { Select } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import SelectModule from '../components/Select-Module/SelectModule';

export const getServerSideProps = async () => {
  const req = await fetch('https://eo2qdk3mdwiezc2mj46p2oilxq0gfpwr.lambda-url.us-east-1.on.aws/');
  const res = await req.json();

  const { modules, constraints } = res;

  console.log('moduuuules', modules);

  return {
    props: {
      modules,
      constraints,
    },
  };
};

export default function HomePage({ modules, constraints }) {
return (
  <>
    <SelectModule modules={modules} />
    <SelectModule modules={constraints} />
    <ColorSchemeToggle />
  </>
);
}
