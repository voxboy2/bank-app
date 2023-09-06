import { Injectable, BadRequestException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import VerificationTokenPayload from './email-vtp-interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailsService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const text = `Welcome to the application. You will need to confirm your email address to be able to transact , own accounts and recieve payments. click here: ${url} to confirm your email address`;

    return this.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.findUserbyEmail(email);
    if (user.email_verified == true) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.markEmailAsConfirmed(email);
  }

  async markEmailAsConfirmed(email: string) {
    await this.userRepository.update({ email }, { email_verified: true });
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (user.email_verified) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
