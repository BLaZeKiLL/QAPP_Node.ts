import { IQuiz } from '../Models/quiz.model';
import { ITarget } from '../Models/misc.model';

class Dispatcher {

  private static quizes: Map<ITarget, IQuiz>;

  public static distribute(target: ITarget, quiz: IQuiz): void {
    this.quizes.set(target, quiz);
  }

  public static get(target: ITarget): IQuiz {
    const quiz = this.quizes.get(target);
    if (quiz == undefined) {
      throw new Error('Quiz Not Found');
    }
    return quiz;
  }

  public static clear(): void {
    this.quizes.clear();
  }

}

export {
  Dispatcher
};
