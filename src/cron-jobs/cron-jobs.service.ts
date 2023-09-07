import { Injectable } from '@nestjs/common';
import EmailScheduleDto from './dto/email-schedule.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EmailsService } from 'src/apis/emails/emails.service';
import { CronJob } from 'cron';

@Injectable()
export class CronJobsService {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.emailsService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content,
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailSchedule.subject}`,
      job,
    );
    job.start();
  }

  cancelAllScheduledEmails() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop();
    });
  }
}
