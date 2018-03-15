import { Belt } from '../utils/Belt';

export const Gender = Belt.strEnum([
  'MALE',
  'FEMALE',
  'MARRIED_FEMALE',
  'UNKNOWN',
]);

export type Gender = keyof typeof Gender;
