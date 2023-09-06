import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User  } from './entities/index'
import { Wallet } from './wallets/wallet.entity';
import { WalletsModule } from './wallets/wallets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionsModule } from './transactions/transactions.module';
import { VirtualAccountsModule } from './virtual-accounts/virtual-accounts.module';
import { EmailsModule } from './emails/emails.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          // JWT_VERIFICATION_TOKEN_SECRET: config.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
          // JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: config.get<string>('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'),
          // EMAIL_CONFIRMATION_URL : config.get<string>('EMAIL_CONFIRMATION_URL'),
          database: 'bank_app',
          port: 8889,
          username: 'root',
          password: 'root',
          host: 'localhost',
          synchronize: true,
          entities: [User, Wallet],
        };
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    WalletsModule,
    TransactionsModule,
    VirtualAccountsModule,
    EmailsModule,
    CronJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
