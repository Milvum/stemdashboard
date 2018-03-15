import { Belt } from '../utils/Belt';

export const StorageKey = Belt.strEnum([
  'ING_DEVICE',
  'ING_LOCATION',
  'ING_ADVISOR',
  'ING_QUEUE',
]);

export type StorageKey = keyof typeof StorageKey;
