import { IQuiz } from '../Models/quiz.model';

class Dispatcher {

  private static quizes: Map<string, IQuiz>;

  public static distribute(target: string, quiz: IQuiz): void {
    this.quizes.set(target, quiz);
  }

  public static get(target: string): IQuiz {
    return this.quizes.get(target);
  }

  public static clear(): void {
    this.quizes.clear();
  }

}
