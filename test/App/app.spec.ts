import { expect } from 'chai';

import { App } from '../../src/App/app';

export const qapp_test = new App('QAPP');

describe('App', () => {

  describe('Node Enviorment', () => {

    it('Test Enviorment', () => {
      expect(process.env.NODE_ENV, 'Envoirment not a string').to.be.a('string');
      expect(process.env.NODE_ENV, 'Envoirment not test').to.equal('test');
    });

    it('App Started and Test DB connected', () => {
      expect(qapp_test, 'App unable to start').to.not.equal(undefined);
    });

  });

});
