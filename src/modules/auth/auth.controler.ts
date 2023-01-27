import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Login into your account' })
  signin(@Body() dto: SigninDto) {
    try {
      return this.authService.signin(dto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom error message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create new account' })
  signup(@Body() dto: SignupDto) {
    try {
      return this.authService.signup(dto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          erroor: 'This is a custom error message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }
}
