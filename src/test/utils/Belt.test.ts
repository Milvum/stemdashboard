import 'mocha';
import { assert } from 'chai';

import { Belt } from '../../main/utils/Belt';

describe('Belt module test', () => {

  it('formatTimer test', () => {
    const timer: number = 9999;
    const minutesOnly: boolean = true;
    const expected: string = '166';

    assert.equal(Belt.formatTimer(timer, minutesOnly), expected);
  });

  it('timeToMs test', () => {
    const minutes: number = 9999;
    const seconds: number = 2222;
    const expected = (Math.max(0, minutes) * 60 + Math.max(0, Math.min(59, seconds))) * 1000;

    assert.equal(Belt.timeToMs({ minutes, seconds }), expected);
  });
});
