import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apis/users/users.module';
import { User } from './entities/index';
import { Wallet } from './apis/wallets/wallet.entity';
import { WalletsModule } from './apis/wallets/wallets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InflowsModule } from './apis/pay-ins/inflows.module';
import { VirtualAccountsModule } from './apis/virtual-accounts/virtual-accounts.module';
import { EmailsModule } from './apis/emails/emails.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import * as Joi from 'joi';
import { Wallet_Transaction } from './apis/wallets/wallet-transaction.entity';
import { Virtual_Account } from './apis/virtual-accounts/virtual-accounts.entity';
import { Inflow } from './apis/pay-ins/inflow.entity';
import { WebhooksModule } from './webhooks/webhooks.module';

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
          database: config.get<string>('DB_NAME'),
          port: 8889,
          username: config.get<string>('DB_USER_NAME'),
          password: config.get<string>('DB_PASSWORD'),
          host: config.get<string>('DB_HOST'),
          synchronize: true,
          entities: [User, Wallet, Inflow, Wallet_Transaction, Virtual_Account],
        };
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    WalletsModule,
    VirtualAccountsModule,
    EmailsModule,
    CronJobsModule,
    InflowsModule,
    Wallet_Transaction,
    VirtualAccountsModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
