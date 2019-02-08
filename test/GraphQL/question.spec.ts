import { graphql } from 'graphql';
import { expect } from 'chai';
import { QuestionType } from '../../src/Models/question.model';
import { GraphQL } from '../Utils/graphql';

describe('Question', () => {

  it('Add questions', async () => {
    const result = await <any>graphql(GraphQL.Executable.Schema, addQuestionsMutation, undefined, undefined, {questions: questions});

    expect(result, 'Result null').to.not.equal(undefined);
    expect(result, 'Error occured').to.not.contain.keys('errors');
    expect(result, 'Data not found').to.contain.keys('data');
    expect(result.data, 'Response not found').to.contain.keys('addQuestions');
    expect(result.data.addQuestions.status.code).to.equal(0, `Status Code: ${result.data.addQuestions.status.code}: ${result.data.addQuestions.status.message}`);

    for (let i = 0; i < result.data.addQuestions.questions.length; i++) {
      expect(result.data.addQuestions.questions[i], 'Invalid Question').to.contain.keys('_id', 'type', 'courseCode', 'statement', 'options');
    }
  });

  it('Get questions for a course code', async () => {
    const result = await <any>graphql(GraphQL.Executable.Schema, getQuestionsQuery, undefined, undefined, {courseCode: 'CS1501'});

    expect(result, 'Result null').to.not.equal(undefined);
    expect(result, 'Error occured').to.not.contain.keys('errors');
    expect(result, 'Data not found').to.contain.keys('data');
    expect(result.data, 'Response not found').to.contain.keys('getQuestions');
    expect(result.data.getQuestions.status.code).to.equal(0, `Status Code: ${result.data.getQuestions.status.code}: ${result.data.getQuestions.status.message}`);

    for (let i = 0; i < result.data.addQuestions.questions.length; i++) {
      expect(result.data.addQuestions.questions[i], 'Invalid Question').to.contain.keys('_id', 'type', 'courseCode', 'statement', 'options');
    }
  });

});

const addQuestionsMutation = `
  mutation AddQuestionsMutation($questions: [QuestionInput!]!) {
    addQuestions(questions: $questions) {
      questions {
        _id
        type
        courseCode
        statement
        options {
          statement
          isAns
        }
      }
      status {
        message
        code
      }
    }
  }
`;

const getQuestionsQuery = `
  query GetQuestionsQuery($courseCode: String!) {
    getQuestions(courseCode: $courseCode) {
      questions {
        _id
        type
        statement
        options {
          statement
          isAns
        }
      }
      status {
        message
        code
      }
    }
  }
`;

const questions = [
  {
    courseCode: 'CS1501',
    statement: 'What is the essentials of dynamic programing ?',
    type: QuestionType.MCQ_MULTIPLE,
    options: [
      {
        statement: 'Dividing',
        isAns: false
      },
      {
        statement: 'Memoization',
        isAns: true
      },
      {
        statement: 'Brute Force',
        isAns: false
      },
      {
        statement: 'Bottom Up',
        isAns: true
      }
    ]
  }, {
    courseCode: 'CS1501',
    statement: 'In a max-heap, element with the greatest key is always in the which node ?',
    type: QuestionType.MCQ_SINGLE,
    options: [
      {
        statement: 'Leaf node',
        isAns: false
      },
      {
        statement: 'First node of left sub tree',
        isAns: false
      },
      {
        statement: 'root node',
        isAns: true
      },
      {
        statement: 'First node of right sub tree',
        isAns: false
      }
    ]
  }, {
    courseCode: 'CS1501',
    statement: 'Which of the follwing have N complexity ?',
    type: QuestionType.MCQ_MULTIPLE,
    options: [
      {
        statement: 'Merge Sort',
        isAns: false
      },
      {
        statement: 'Counting Sort',
        isAns: true
      },
      {
        statement: 'Radix Sort',
        isAns: true
      },
      {
        statement: 'Quick Sort',
        isAns: false
      }
    ]
  }, {
    courseCode: 'CS1501',
    statement: 'Which of the following problems can be solved using recursion ?',
    type: QuestionType.MCQ_SINGLE,
    options: [
      {
        statement: 'Factorial of a number',
        isAns: false
      },
      {
        statement: 'Nth fibonacci number',
        isAns: false
      },
      {
        statement: 'Length of a string',
        isAns: false
      },
      {
        statement: 'All of the mentioned',
        isAns: true
      }
    ]
  }, {
    courseCode: 'CS1501',
    statement: 'What are the types of complexity analysis ?',
    type: QuestionType.MCQ_MULTIPLE,
    options: [
      {
        statement: 'Space',
        isAns: true
      },
      {
        statement: 'Size',
        isAns: false
      },
      {
        statement: 'Line',
        isAns: false
      },
      {
        statement: 'Time',
        isAns: true
      }
    ]
  }
];
