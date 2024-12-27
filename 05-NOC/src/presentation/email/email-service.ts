import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

const origin = 'email-service.ts';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: sendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      // console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithSystemlogs(to: string | string[]): Promise<boolean> {
    const subject = 'Logs del sistema';
    const htmlBody = `
      <h1>Logs del sistema</h1>
      <p>Ipsum mollit dolor enim dolor id id laborum dolore in. Cupidatat aute culpa do amet eu officia non. Occaecat id excepteur nisi incididunt quis elit labore. Dolor officia cillum Lorem culpa. Pariatur minim amet ad ullamco adipisicing.</p>
      <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
