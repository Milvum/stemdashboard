import 'mocha';
import { assert } from 'chai';

function sum(): number {
  const a: number = 1;
  const b: number = 3;

  return a + b;
}

describe('my test', () => {
  it('does something', () => {
    assert.equal(sum(), 4);
  });
});
