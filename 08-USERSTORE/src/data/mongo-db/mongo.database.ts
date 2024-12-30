import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    console.log(`Conectando a la base de datos ${dbName}...`);

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
}
