import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

export class Server {
  public static start() {
    console.log('Server started');

    const job = CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('https://www.google.com');
      const url = 'http://localhost:3000/posts';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is working fine`),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}
