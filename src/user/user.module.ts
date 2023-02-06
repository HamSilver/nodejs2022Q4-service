import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [InMemoryDBModule.forFeature('user')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
