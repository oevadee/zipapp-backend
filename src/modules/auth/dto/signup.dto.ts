import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly confirmPassword: string;
}
