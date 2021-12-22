import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    for (let i = 1; i <= 3; i++) {
      this.createUser(`User ${i}`, `user${i}@example.com`, 'secret');
    }
  }

  findByName(name: string): User {
    return this.users.find((user) => user.name === name);
  }

  create(createUserDto: CreateUserDto): User {
    const { name, email, password } = createUserDto;
    return this.createUser(name, email, password);
  }

  findAll(): User[] {
    return [...this.users];
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (updateUserDto.email) user.name = updateUserDto.name;
    if (updateUserDto.password) user.setPassword(updateUserDto.password);
    return user;
  }

  remove(id: number): void {
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  private createUser(name: string, email: string, plainPassword: string): User {
    const user = new User();
    user.id = this.users.length + 1;
    user.email = email;
    user.name = name;
    user.setPassword(plainPassword);
    this.users.push(user);
    return user;
  }
}
