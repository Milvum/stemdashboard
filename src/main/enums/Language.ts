import { Belt } from '../utils/Belt';

export const Language = Belt.strEnum([
  'nl_NL',
  'fr_FR',
]);

export type Language = keyof typeof Language;
