import { LogRepository } from '../../repositories/log.repository';
import { EmailService } from '../../../presentation/email/email-service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

const origin = 'send-email-logs.ts';

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithSystemlogs(to);

      if (!sent) {
        throw new Error('Email  log not sent');
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log email sent',
        origin,
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin,
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
