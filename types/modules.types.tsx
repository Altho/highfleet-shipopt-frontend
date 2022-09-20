export interface ModuleInput {
  fuel_cap: number,
  ammo: number,
  cost: number,
  fpl: number,
  hp: number,
  squares: number,
  weight: number,
  type: string,
  crew: number,
  mounting: string,
  fuel_rate: number,
  width: number,
  thrust: string,
  firewpower: number,
  id: string,
  common_name: string,
  energy: number,
  height: number
}

export interface ConstraintInput {
  current: number,
  min: number,
  max: number,
  id: string,
  units: string,
  common_name: string,
}

export interface Module {
  value: string,
  label: string,
  group: string,
  cost: number,
  fuel_cap: number,
  hp: number,
  squares: number,
  weight: number,
  fuel_rate: number,
  width: number,
  height: number,
  thrust: string,
  firepower: number,
  energy: number,
  offset: string,
  amount: number,
}

export interface Constraint {
  label: string,
  value: string,
  min: number,
  max: number,
  units: string,
  offset: string,
  range: [number, number]

}

export type IndexProps = {
  modules: Module[],
  constraints: Constraint[],
};
