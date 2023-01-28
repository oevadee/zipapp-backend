import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}
