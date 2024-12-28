import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallback = (() => void) | undefined;
type errorCallback = ((error: string) => void) | undefined;

const origin = 'check-service.ts';

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: successCallback,
    private readonly errorCallback: errorCallback,
  ) {}

  private callLogs = (log: LogEntity) => {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  };

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service ${url}`);

      const log = new LogEntity({
        message: `Service ${url} is working fine`,
        level: LogSeverityLevel.low,
        origin,
      });

      this.callLogs(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin,
      });

      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
