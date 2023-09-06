import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Module({
  imports: [ConfigModule,TypeOrmModule.forFeature([User])],
  controllers: [EmailsController],
  providers: [EmailsService, UsersService, JwtService],
  exports: [EmailsService]
})
export class EmailsModule {}
