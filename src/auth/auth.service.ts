import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly HASH_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  /**
   * Validates a user by username and password
   * 
   * @param  {string} username
   * @param  {string} password
   * @returns A user if found and valid or null
   */
  async validateUser(username: string, password: string): Promise<any> | null {
    const user = await this.usersService.findByUsername(username);

    console.log(user.password)
    console.log(password)
    const validPassword = await bcrypt.compare(password, user.password);

    if (user && validPassword) {
      // Result is the complete user object without password
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  /**
   * 
   * @param registerUserDto User to register
   * @returns Newly created user
   */
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    // Check if user exists
    const result = await this.usersService.findByUsername(registerUserDto.username);

    if (result) {
      // User already exists
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash password
    registerUserDto.password = await bcrypt.hash(registerUserDto.password, this.HASH_ROUNDS);

    return await this.usersService.createOne(registerUserDto);
  }
}
