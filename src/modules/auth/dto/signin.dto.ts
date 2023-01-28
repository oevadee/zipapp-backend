import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
