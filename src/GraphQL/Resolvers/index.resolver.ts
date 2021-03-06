import { Query as miscQuery, Mutation as miscMutation } from './misc.resolver';
import { Query as questionQuery, Mutation as questionMutation } from './question.resolver';
import { Query as quizQuery, Mutation as quizMutation } from './quiz.resolver';
import { Query as resultQuery, Mutation as resultMutation } from './result.resolver';
import { Query as studentQuery, Mutation as studentMutation } from './student.resolver';
import { Query as teacherQuery, Mutation as teacherMutation } from './teacher.resolver';

export const Resolvers = {
  // Query
    ...miscQuery,
    ...questionQuery,
    ...quizQuery,
    ...resultQuery,
    ...studentQuery,
    ...teacherQuery,
  // Mutation
    ...miscMutation,
    ...questionMutation,
    ...quizMutation,
    ...resultMutation,
    ...studentMutation,
    ...teacherMutation,
};
