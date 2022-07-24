/* eslint-disable */
import { assert } from 'chai';
import Validate from '../validation';

describe('Validate', () => {

  it('no capital letter in first name', () => {
    const expected = 'capitalize your name';
    const result = Validate('test', 'first_name');
    assert.equal(result, expected);
  });

  it('login length < 3', () => {
    const expected = 'use 3 to 20 characters';
    const result = Validate('ab', 'login');
    assert.equal(result, expected);
  });

});
