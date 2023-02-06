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

  getAll(): Omit<UserEntity, 'password'>[] {
    const usersArray = this.memoryUserService.getAll();
    const result = usersArray.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = item;
      return userData;
    });
    return result;
  }

  getOne(id: string): Omit<UserEntity, 'password'> {
    const result = this.memoryUserService.get(id);
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = this.memoryUserService.get(id);
      return userData;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  create(body: CreateUserDto): Omit<UserEntity, 'password'> {
    const newUser: UserEntity = <UserEntity>body;
    newUser.version = 1;
    newUser.createdAt = new Date().getTime();
    newUser.updatedAt = newUser.createdAt;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = this.memoryUserService.create(
      newUser,
      uuidv4,
    );
    return userData;
  }

  update(id: string, body: UpdatePasswordDto): Omit<UserEntity, 'password'> {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = newUser;
      return userData;
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
