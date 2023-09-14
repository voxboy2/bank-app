import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards
} from '@nestjs/common';
import ConfirmEmailDto from './dto/confirm-email.dto';
import { User } from 'src/entities';
import { Request } from 'express';
import { EmailsService } from './emails.service';
import { CurrentUser } from '../users/decorators/current-user.decorators';
import { AuthGuard } from 'src/guards/auth.guard';



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


 @UseGuards(AuthGuard)
 @Post('resend-confirmation-link')
  async resendConfirmationLink(@CurrentUser() user: User) {
    await this.emailsService.resendConfirmationLink(user.id);
  }
}
