import transformProps from 'transform-props';

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

function castToString(arg: any) {
  return String(arg);
}

class Mongo {

  public static connectDB(url: string): void {
    connect(url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .catch((error) => {
      throw new Error('MONGODB');
    });
  }

  public static async add<T>(model: Model<Document>, obj: any): Promise<T> {
    try {
      const doc = await <any>model.create(obj);
      Log.main.info('Document Added');
      Log.main.verbose(JSON.stringify(doc));
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
      Log.main.info('Documents Added');
      Log.main.verbose(JSON.stringify(docs));
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

  public static async getOne<T, F>(model: Model<Document>, filter?: F, id?: Schema.Types.ObjectId): Promise<T> {
    try {
      let doc: any;
      if (filter) {
        doc = await model.findOne(filter);
      } else if (id) {
        doc = await model.findById(id);
      } else {
        throw new Error('Invalid Arguments');
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

  public static async getOneQuiz<T, F>(model: Model<Document>, filter?: F, id?: Schema.Types.ObjectId): Promise<T> {
    try {
      let doc: any;
      if (filter) {
        doc = await model.findOne(filter).populate('questions.question').exec();
      } else if (id) {
        doc = await model.findById(id).populate('questions.question').exec();
      } else {
        throw new Error('Invalid Arguments');
      }
      const docObj = doc.toObject();
      transformProps(docObj, castToString, '_id');
      Log.main.info('AFTER  ' + JSON.stringify(docObj));
      return docObj;
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

  public static async update<T>(model: Model<Document>, update: any, id: Schema.Types.ObjectId): Promise<T> {
    try {
      return await <any>model.findOneAndUpdate({_id: id}, {$set: update});
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

  public static async addToArray<T>(model: Model<Document>, update: any, id: Schema.Types.ObjectId): Promise<T> {
    try {
      return await <any>model.findOneAndUpdate({_id: id}, {$push: update});
    } catch (error) {
      Log.main.error(error);
      throw new Error('MONGODB');
    }
  }

}

class MongoUtils {
  public static bsonConverterArray(docs: any) {
    const docObjs: any[] = [];
    docs.forEach((doc: any) => {
      docObjs.push(this.bsonConverter(doc));
    });
    return docObjs;
  }

  public static bsonConverter(doc: any) {
    const docObj = doc.toObject();
    transformProps(docObj, castToString, '_id');
    return docObj;
  }
}


export {
  Mongo,
  MongoUtils,
  Schema,
  model
};
