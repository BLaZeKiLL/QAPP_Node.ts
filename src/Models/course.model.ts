import { JSONHandler } from '../Modules/JSON';
import { IStatus } from './misc.model';

interface ICourse {
  name: string;
  code: string;
  targets: string[];
  branches: string[];
}

interface ITargetResponse {
  data?: {
    targets: string[];
    branches: string[];
  };
  status: IStatus;
}

class Course {

  private static readonly FILE_NAME: string = 'course.json';

  public static async addCourse(course: ICourse): Promise<boolean> {
    return false;
  }

  public static async getTargets(courseCode: string): Promise<{targets: string[], branches: string[]}> {
    const courses = await JSONHandler.readData<ICourse[]>(this.FILE_NAME);
    let data: {targets: string[], branches: string[]};
    courses.forEach((course) => {
      if (course.code === courseCode) {
        data = {
          targets: course.targets,
          branches: course.branches
        };
      }
    });
    return data;
  }

}

export {
  ICourse,
  ITargetResponse,
  Course
};
