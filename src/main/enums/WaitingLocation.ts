import { Belt } from '../utils/Belt';

export const WaitingLocation = Belt.strEnum([
  'BOOTH',
  'BAR',
  'NOT_PRESENT',
  'NONE',
  'UNKNOWN',
]);

export type WaitingLocation = keyof typeof WaitingLocation;
