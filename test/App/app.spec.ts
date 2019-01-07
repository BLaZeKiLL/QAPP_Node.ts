process.env.NODE_ENV = 'test';

import { assert } from 'chai';
import app from '../../src/server';

describe('App', () => {
  describe('getLocalUrl()', () => {
    it('getLocalUrl() should return http://localhost:3000/', () => {
      assert.equal(app.getLocalUrl(), 'http://localhost:3000/');
    });
  });
});
