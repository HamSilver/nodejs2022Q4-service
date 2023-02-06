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
  UseInterceptors,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { checkUrlForSlash } from 'src/utils/checkUrl';
import { PswInterceptor } from './interceptors/psw.interceptor';

@UseInterceptors(PswInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    checkUrlForSlash(req);
    return this.userService.getAll();
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
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
    @Req() req: any,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    checkUrlForSlash(req);
    return this.userService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.userService.delete(id);
  }
}
