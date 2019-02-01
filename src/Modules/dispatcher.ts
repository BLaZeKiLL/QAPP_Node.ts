import { IQuiz } from '../Models/quiz.model';
import { Log } from './logger';

class Dispatcher {

  private static quizes: Map<string, IQuiz> = new Map<string, IQuiz>();

  public static distribute(target: string, quiz: IQuiz): void {
    Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
    this.quizes.set(target, quiz);
  }

  public static get(target: string): IQuiz {
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
