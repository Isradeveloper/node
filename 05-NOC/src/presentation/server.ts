import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    // //* MANDAR EMAIL
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'ingisraeltrujillo@gmail.com',
    // );

    //* CHECKEAR SERVICIO CADA 5 SEGUNDOS
    const job = CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('https://www.google.com');
      const url = 'https://www.google.com';
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is working fine`),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}
