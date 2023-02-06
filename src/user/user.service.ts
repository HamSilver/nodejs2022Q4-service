import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private memoryUserService: InMemoryDBService<UserEntity>) {}

  getAll(): UserEntity[] {
    return this.memoryUserService.getAll();
  }

  getOne(id: string) {
    return this.memoryUserService.get(id);
  }

  create(body: CreateUserDto): UserEntity {
    const newUser: UserEntity = <UserEntity>body;
    newUser.version = 1;
    newUser.createdAt = new Date().getTime();
    newUser.updatedAt = newUser.createdAt;
    return this.memoryUserService.create(newUser, uuidv4);
  }

  update(id: string, body: UpdatePasswordDto): UserEntity {
    const currentUser = this.memoryUserService.get(id);
    if (currentUser) {
      if (body.oldPassword !== currentUser.password) {
        throw new ForbiddenException('Wrong password');
      }
      const newUser = {
        ...currentUser,
        password: body.newPassword,
        version: currentUser.version + 1,
        updatedAt: new Date().getTime(),
      };
      this.memoryUserService.update(newUser);
      return newUser;
    }
    throw new NotFoundException('User not found');
  }

  delete(id: string): void {
    if (this.memoryUserService.get(id)) {
      this.memoryUserService.delete(id);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
