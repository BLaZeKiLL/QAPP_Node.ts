import { Course, ITargetResponse } from '../../Models/course.model';

export = {
  getTargets: async (args: any, req: any): Promise<ITargetResponse> => {
    try {
      const targets = await Course.getTargets(args.courseCode);
      return {
        targets: targets,
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch (error) {

    }
  }
};
