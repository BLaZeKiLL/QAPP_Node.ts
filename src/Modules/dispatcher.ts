import { IQuiz } from '../Models/quiz.model';
import { ITarget } from '../Models/misc.model';

class Dispatcher {

  private static quizes: Map<ITarget, IQuiz>;

  public static distribute(target: ITarget, quiz: IQuiz): void {
    this.quizes.set(target, quiz);
  }

  public static get(target: ITarget): IQuiz {
    return this.quizes.get(target);
  }

  public static clear(): void {
    this.quizes.clear();
  }

}

export {
  Dispatcher
};
