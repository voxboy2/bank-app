import { Expose, Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsNumber()
  balance: number;

  @IsString()
  currency: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;
}
