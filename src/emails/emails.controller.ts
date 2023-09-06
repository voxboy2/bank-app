import {
  Controller,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import ConfirmEmailDto from './dto/confirm-email.dto';
import { User } from 'src/entities';
import { Request } from 'express';
import { EmailsService } from './emails.service';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Post('confirm-email')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailsService.decodeConfirmationToken(
      confirmationData.token,
    );

    // console.log(email);

    await this.emailsService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.emailsService.resendConfirmationLink(request.user.id);
  }
}
