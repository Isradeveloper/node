import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    await prismaClient.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level],
      },
    });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });

    return dbLogs.map((log) => LogEntity.fromObject(log));
  }
}
