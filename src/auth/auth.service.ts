import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  /**
   * Validates a user by username and password
   * 
   * TODO: Use hashed passwords
   * 
   * @param  {string} username
   * @param  {string} password
   * @returns Promise<User | null>
   */
  async validateUser(username: string, password: string): Promise<any> | null {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
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

    return await this.usersService.createOne(registerUserDto);
  }
}
