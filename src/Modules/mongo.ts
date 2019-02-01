import { Log } from '../Modules/logger';
import { Model,
         Document,
         Error,
         Schema,
         model,
         connect } from 'mongoose';

// Static interface not supported by TypeScript
interface IModel<T, F> {
  add(obj: T): Promise<T>;
  get(filter?: F): Promise<T[]>;
  getOne(filter?: F, id?: string): Promise<T>;
}

class Mongo {

  public static connectDB(url: string): void {
    connect(url, { useNewUrlParser: true, useCreateIndex: true, })
    .catch((error) => {
      throw new Error('MONGODB');
    });
  }

  public static async add<T>(model: Model<Document>, obj: T): Promise<T> {
    try {
      const doc = await <any>model.create(obj);
      return {
        ...doc._doc,
        _id: doc.id
      };
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

  public static async addMany<T>(model: Model<Document>, objs: T[]): Promise<T[]> {
    try {
      const docs = await model.insertMany(objs);
      const rdocs = <any[]>docs.map((doc: any) => {
        return <any>{
          ...doc._doc,
          _id: doc.id
        };
      });
      return rdocs;
    } catch (error) {
      const errorData = JSON.parse(error);
      const ids = errorData.result.insertedIds.map((a: any) => a._id);
      model.find({ _id: { $in: ids } }, (err, docs) => {
        if (err) {
          Log.main.error(err);
          throw new Error('MONGODB');
        } else {
          return docs;
        }
      });
    }
  }

  public static async get<T, F>(model: Model<Document>, filter?: F): Promise<T[]> {
    try {
      const docs = await <any>model.find(filter ? filter : {});
      return docs.map((doc: any) => {
        return {
          ...doc._doc,
          _id: doc.id
        };
      });
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

  public static async getOne<T, F>(model: Model<Document>, filter?: F, id?: Schema.Types.ObjectId,  populate: boolean = false): Promise<T> {
    try {
      let doc: any;
      if (filter) {
        doc = await model.findOne(filter);
      } else if (id) {
        doc = await model.findById(id);
      } else {
        throw new Error('Invalid Arguments');
      }
      if (populate) {
        Log.main.info('populating');
        doc = await (<Document>doc).populate('questions.question').execPopulate();
        doc.questions = (<any[]>doc.questions).map((IMGquestion) => {
          IMGquestion.question._id = IMGquestion.question._id.toString();
        });
        Log.main.info(JSON.stringify(doc));
      }
      return {
        ...doc._doc,
        _id: doc.id
      };
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

  public static async delete(model: Model<Document>, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await model.deleteOne({ _id: id});
      return true;
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

  public static async update<T, F>(model: Model<Document>, filter: F, id: Schema.Types.ObjectId): Promise<T> {
    try {
      return await <any>model.findByIdAndUpdate(id, filter);
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

}

export {
  Mongo,
  Schema,
  model
};
