import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { bcryptRounds } from 'src/constants/auth';
import { comparePassword } from 'src/utils/bcrypt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(dto: SigninDto) {
    const { email, password } = dto;
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = user && (await comparePassword(password, user.password));
    if (user && isMatch) {
      const payload = { email: dto.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return 'Invalid credentials';
  }

  async signup(dto: SignupDto) {
    const { email, password, confirmPassword } = dto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user && password === confirmPassword) {
      const newUser = await this.usersService.create({
        email,
        password,
      });
      return {
        access_token: this.jwtService.sign({
          email,
          sub: newUser.id,
        }),
      };
    }
    return 'Invalid credentials';
  }

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneById(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
