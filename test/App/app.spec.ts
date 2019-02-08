import { expect } from 'chai';

import { App } from '../../src/App/app';
import { GraphQL } from '../Utils/graphql';

export const qapp_test = new App('QAPP');

describe('Main', () => {

  describe('Node Enviorment', () => {

    it('Node enviorment is test', () => {
      expect(process.env.NODE_ENV, 'Envoirment not a string').to.be.a('string');
      expect(process.env.NODE_ENV, 'Envoirment not test').to.equal('test');
    });

  });

  describe('API initialization', () => {

    it('App Started and Test DB connected', () => {
      expect(qapp_test, 'App unable to start').to.not.equal(undefined);
    });

  });

  describe('Load graphql', () => {

    it('GraphQL schema loaded', () => {
      expect(GraphQL.Executable.Schema, 'Failed to build schema').to.not.equal(undefined);
    });

  });

});

