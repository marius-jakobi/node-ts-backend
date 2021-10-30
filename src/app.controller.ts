import { Controller, Get } from '@nestjs/common';

import pkg from "../package.json";
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private userService: UsersService) {}

  @Get()
  index(): any {
    return {
      version: pkg.version,
      env: process.env.ENVIRONMENT
    };
  }
}
