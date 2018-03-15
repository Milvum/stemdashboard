import { Belt } from '../utils/Belt';

export const AdvisorDisplayMode = Belt.strEnum([
  'QUEUE_BASED',
  'ROLE_BASED',
]);

export type AdvisorDisplayMode = keyof typeof AdvisorDisplayMode;
