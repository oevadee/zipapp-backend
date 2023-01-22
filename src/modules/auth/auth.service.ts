import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signin(dto: SigninDto) {
    const payload = { email: dto.email, sub: dto.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
