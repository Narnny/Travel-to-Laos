import { Province } from '../types/travel';
import { northernProvinces } from './provinces/north';
import { centralProvinces } from './provinces/central';
import { southernProvinces } from './provinces/south';

export const allProvincesData: Province[] = [
  ...northernProvinces,
  ...centralProvinces,
  ...southernProvinces,
];

export const getProvincesByRegion = (regionId: 'north' | 'central' | 'south') => {
  return allProvincesData.filter((p) => p.region === regionId);
};

export const getProvinceById = (id: string) => {
  return allProvincesData.find((p) => p.id === id);
};
