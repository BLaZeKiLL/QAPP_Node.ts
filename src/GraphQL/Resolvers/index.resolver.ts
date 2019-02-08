import { Query as adminQuery, Mutation as adminMutation } from './admin.resolver';
import { Query as courseQuery, Mutation as courseMutation } from './course.resolver';
import { Query as miscQuery, Mutation as miscMutation } from './misc.resolver';
import { Query as questionQuery, Mutation as questionMutation } from './question.resolver';
import { Query as quizQuery, Mutation as quizMutation } from './quiz.resolver';
import { Query as resultQuery, Mutation as resultMutation } from './result.resolver';
import { Query as studentQuery, Mutation as studentMutation } from './student.resolver';
import { Query as teacherQuery, Mutation as teacherMutation } from './teacher.resolver';

export const Resolvers = {
  Query: {
    ...adminQuery,
    ...courseQuery,
    ...miscQuery,
    ...questionQuery,
    ...quizQuery,
    ...resultQuery,
    ...studentQuery,
    ...teacherQuery
  },
  Mutation: {
    ...adminMutation,
    ...courseMutation,
    ...miscMutation,
    ...questionMutation,
    ...quizMutation,
    ...resultMutation,
    ...studentMutation,
    ...teacherMutation
  }
};
