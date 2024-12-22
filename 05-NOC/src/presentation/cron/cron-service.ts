import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(
      cronTime, // cronTime
      onTick, // onTick
      null, // onComplete
      true, // start
      'America/Bogota', // timeZone
    );

    job.start();
    return job;
  }
}
