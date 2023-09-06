import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { EmailsService } from 'src/emails/emails.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User) private user: Repository<User>,
    private walletsService: WalletsService,
    private emailsService: EmailsService
  ) {}

  async signup(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) {
    // See if email is in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

   

    // generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user
    const user = await this.usersService.create(
      first_name,
      last_name,
      email,
      result,
    );


    if (!user) {
      throw new BadRequestException("Unable to save user's data");
    }

     
    if (user) {
      await this.user.save(user);
    }


    let wallets;
    if (!wallets) {
      await this.walletsService.create(wallets, user.id)
    }

    return user;
  }


  async signin(email: string, password: string) {
    
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }




}
