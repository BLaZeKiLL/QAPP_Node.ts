import { Course, ITargetResponse } from '../../Models/course.model';
import { isTeacher, isAdmin } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';
import { Log } from '../../Modules/logger';

const Query = {
  getTargets: async (args: any, req: any): Promise<ITargetResponse> => {
    try {
      isTeacher(req);
      Log.main.info(`TARGETS FOR COURSE CODE: ${args.courseCode}`);
      const data = await Course.getTargets(args.courseCode);
      return {
        data: data,
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
  }
};

const Mutation = {
  addCourse: async (args: any, req: any): Promise<boolean> => {
    try {
      return true;
    } catch (error) {

    }
  }
};

export {
  Query,
  Mutation
};
