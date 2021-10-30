import { Controller, Request, Post, UseGuards, Get, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Validates user login data and returns a JWT
   * @param  {} req
   * @returns { access_token: string }
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Returns a authenticated users profile
   * @param req 
   * @returns 
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }

  /**
   * Register a new user
   */
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    if (!registerUserDto.email || !registerUserDto.password) {
      throw new HttpException('Please provide a email and password', HttpStatus.BAD_REQUEST)
    }

    const user = await this.authService.register(registerUserDto)

    res.status(HttpStatus.CREATED).json({
      id: user.id,
      email: user.email
    });
  }
}
