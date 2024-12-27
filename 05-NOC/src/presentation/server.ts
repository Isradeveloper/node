import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    //* MANDAR EMAIL
    new SendEmailLogs(emailService, fileSystemLogRepository).execute(
      'ingisraeltrujillo@gmail.com',
    );

    //* CHECKEAR SERVICIO CADA 5 SEGUNDOS
    // const job = CronService.createJob('*/5 * * * * *', () => {
    //   // new CheckService().execute('https://www.google.com');
    //   const url = 'https://www.google.com';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is working fine`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
}
