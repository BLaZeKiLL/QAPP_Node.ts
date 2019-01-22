import { JSONHandler } from '../Modules/JSON';
import { IStatus } from './misc.model';

interface ICourse {
  name: string;
  code: string;
  targets: string[];
}

interface ITargetResponse {
  targets?: string[];
  status: IStatus;
}

class Course {

  private static readonly FILE_NAME: string = 'course.json';

  public static async addCourse(course: ICourse): Promise<boolean> {
    return false;
  }

  public static async getTargets(courseCode: string): Promise<string[]> {
    const courses = await JSONHandler.readData<ICourse[]>(this.FILE_NAME);
    let targets: string[] = [];
    courses.forEach((course) => {
      if (course.code === courseCode) targets = course.targets;
    });
    return targets;
  }

}

export {
  ICourse,
  ITargetResponse,
  Course
};
