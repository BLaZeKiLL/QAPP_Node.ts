import { IQuiz } from '../Models/quiz.model';

class Dispatcher {

  private static quizes: Map<string, IQuiz>;

  public static distribute(target: string, quiz: IQuiz): void {
    this.quizes.set(target, quiz);
  }

  public static get(target: string): IQuiz {
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
