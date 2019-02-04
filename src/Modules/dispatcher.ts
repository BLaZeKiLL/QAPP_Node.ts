import { IQuiz } from '../Models/quiz.model';
import { Log } from './logger';

class Dispatcher {

  private static quizes: Map<string, {_id: string, JSON: string}> = new Map<string, {_id: string, JSON: string}>();

  public static distribute(target: string, quiz: IQuiz): void {
    Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
    this.quizes.set(target, { _id: quiz._id.toString(), JSON: JSON.stringify(quiz) });
  }

  public static get(target: string): {_id: string, JSON: string} {
    const quiz = this.quizes.get(target);
    if (quiz === undefined || quiz === null) {
      throw new Error('Quiz Not Found');
    } else {
      Log.main.info('QUIZ DISPATCHED');
      return quiz;
    }
  }

  public static clear(): void {
    this.quizes.clear();
  }

}

export {
  Dispatcher
};
