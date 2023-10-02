import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { InflowsService } from './inflows.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('payins')
export class InflowsController {
  constructor(private inflowsService: InflowsService) {}

  @Get('/home')
  async servePayPage(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../../index.html'));
  }

  @Post('/receive')
  async receive(@Req() req: Request, @Res() res: Response) {

    // await this.InflowsService.verifyPaystackWebhook(
    //   req,
    //   res,
    // );

    const webhook = await this.inflowsService.processPaystackWebhook(
      req,
      res,
    );
    return webhook;
  }


}
