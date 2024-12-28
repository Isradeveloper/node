import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  //* Crear una colección
  // const newLog = await LogModel.create({
  //   message: 'Log de prueba',
  //   level: 'low',
  //   origin: 'app.ts',
  // });

  // await newLog.save();

  // console.log(newLog);

  //* Obtener todos los logs
  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Log de prueba',
  //     origin: 'app.ts',
  //   },
  // });

  // console.log(newLog);

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH',
  //   },
  // });
  // console.log(logs);

  // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);
}
