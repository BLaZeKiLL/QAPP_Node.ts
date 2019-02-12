import { expect } from 'chai';
import { GraphQLTest } from '../Utils/graphql.spec';

describe('Statics', () => {

  describe('Targets', () => {

    it('Targets for CS1501', async () => {
      const result = await GraphQLTest.Schema.execute(getTargetsQuery, {courseCode: 'CS1501'});

      expect(result, 'Result null').to.not.equal(undefined);
      expect(result, 'Error occured').to.not.contain.keys('errors');
      if (result.errors) { console.log(JSON.stringify(result)); }
      expect(result.data, 'Response not found').to.contain.keys('getTargets');
      expect(result.data.getTargets.status.code).to.equal(0, `Status Code: ${result.data.getTargets.status.code}: ${result.data.getTargets.status.message}`);
      expect(result.data.getTargets.data, 'Data mismatch').to.eql(responseData); // Deep Equality
    });

  });

});

const getTargetsQuery = `
  query GetTargetsQuery($courseCode: String!) {
    getTargets(courseCode: $courseCode) {
      data {
        targets
        branches
      }
      status {
        message
        code
      }
    }
  }
`;

const responseData = {targets: ['CS5A', 'CS5B', 'CS5C', 'CS5D', 'IT5A', 'IT5B', 'IT5C', 'CC5A', 'CC5B', 'CC5C'], branches: ['CS', 'IT', 'CC']};
