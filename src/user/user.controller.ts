import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    const url: string = req?.url ?? '';
    if (url.endsWith('/')) {
      throw new NotFoundException();
    }
    return this.userService.getAll();
  }

  @Get('/:id')
  public async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.userService.getOne(id);
    if (result) {
      return this.userService.getOne(id);
    }
    throw new NotFoundException();
  }

  @Post('/')
  public async create(
    @Body() body: CreateUserDto,
    @Headers('Content-Type') header: string,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.userService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
    @Headers('Content-Type') header: string,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
