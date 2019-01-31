import { fs_writeFile, fs_readFile } from './Promise';
import { Log } from './logger';

export class JSONHandler {

  private static readonly PATH = '../Static/';

  public static async saveData<T>(fileName: string, data: T): Promise<boolean> {
    try {
      await fs_writeFile(this.PATH + fileName, JSON.stringify(data));
      Log.main.info('DATA SAVED');
      return true;
    } catch (error) {
      Log.main.error('JSON SERIALIZATION');
      Log.main.error(error);
      throw new Error('JSON SERIALIZATION');
    }
  }

  public static async readData<T>(fileName: string): Promise<T> {
    try {
      const data: T = JSON.parse((await fs_readFile(this.PATH + fileName)).toString());
      return data;
    } catch (error) {
      throw new Error('JSON SERIALIZATION');
    }
  }

}
