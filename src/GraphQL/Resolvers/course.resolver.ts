import { Course, ITargetResponse } from '../../Models/course.model';
import { isTeacher, isAdmin } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';

export = {
  getTargets: async (args: any, req: any): Promise<ITargetResponse> => {
    try {
      isTeacher(req);
      const targets = await Course.getTargets(args.courseCode);
      return {
        targets: targets,
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch (error) {
      return {
        status: Handle(error)
      };
    }
  },
  addCourse: async (args: any, req: any): Promise<boolean> => {
    try {
      return true;
    } catch (error) {

    }
  }
};
