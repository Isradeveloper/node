import { envs } from '../../config';
import { seedData } from './data';

import {
  CategoryModel,
  ProductModel,
  MongoDatabase,
  UserModel,
} from '../mongo-db';

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();
  await MongoDatabase.disconnect();
})();

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

async function main() {
  //* BORRAR TODO
  await Promise.all([
    UserModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ProductModel.deleteMany({}),
  ]);

  //* SEED USUARIOS
  const users = await UserModel.insertMany(seedData.users);

  //* SEED CATEGORIAS
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween(0, users.length - 1)]._id,
    })),
  );

  //* SEED PRODUCTOS
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween(0, users.length - 1)]._id,
      category: categories[randomBetween(0, categories.length - 1)]._id,
    })),
  );

  console.log('Seed ejecutado correctamente');
}
