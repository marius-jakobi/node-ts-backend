import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  /**
   * Return a list of all users
   * @returns List of users
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Return a single user by ID
   * @param id User ID
   * @returns A single user by ID
   */
  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Return a single user by username
   * @param username Username
   * @returns A user by username
   */
  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username })
  }

  /**
   * Create one user and return it
   * @param registerUserDto A RegisterUserDTO
   * @returns A newly created User
   */
  async createOne(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    
    return this.usersRepository.save(user);
  }
}
