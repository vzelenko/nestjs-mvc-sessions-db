import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(name: string, pass: string): Promise<User> {
    const user = this.usersService.findByName(name);

    if (user && user.passwordValid(pass)) {
      return user;
    }
    return null;
  }
}
