import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'bob',
      password: 'password'
    },
    {
      userId: 2,
      username: 'alice',
      password: 'password'
    },
  ];

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.userId === id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
