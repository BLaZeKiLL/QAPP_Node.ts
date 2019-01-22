import AdminResolvers from './admin.resolver';
import CourseResolvers from './course.resolver';
import MiscResolvers from './misc.resolver';
import QuestionResolvers from './question.resolver';
import QuizResolvers from './quiz.resolver';
import ResultResolvers from './result.resolver';
import StudentResolvers from './student.resolver';
import TeacherResolvers from './teacher.resolver';

export = {
  ...AdminResolvers,
  ...CourseResolvers,
  ...MiscResolvers,
  ...QuestionResolvers,
  ...QuizResolvers,
  ...ResultResolvers,
  ...StudentResolvers,
  ...TeacherResolvers
};
