import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { response, Response } from 'express';
import * as path from 'path';
import { CurrentUser } from '../users/decorators/current-user.decorators';
import { User } from 'src/entities';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('/pay')
  async servePayPage(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../../index.html'));
  }
  @Post('/webhook-response')
  async verifyTransactionStatus(@Req() req: Request, @Res() res: Response) {

    // await this.transactionsService.verifyPaystackWebhook(
    //   req,
    //   res,
    // );

    const webhook = await this.transactionsService.processPaystackWebhook(
      req,
      res,
    );
    return webhook;
  }
}
