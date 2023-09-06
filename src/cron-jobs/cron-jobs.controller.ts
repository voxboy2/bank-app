import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { EmailScheduleDto } from './dto/email-schedule.dto';

@Controller('cron-jobs')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @Post('email-schedule')
  create(@Body() emailSchedule: EmailScheduleDto) {
    return this.cronJobsService.scheduleEmail(emailSchedule);
  }
}
