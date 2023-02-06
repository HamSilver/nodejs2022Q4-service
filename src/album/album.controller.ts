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
import { AlbumService } from './album.service';
import { checkUrlForSlash } from 'src/utils/checkUrl';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    checkUrlForSlash(req);
    return this.albumService.getAll();
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    const result = this.albumService.getOne(id);
    if (result) {
      return this.albumService.getOne(id);
    }
    throw new NotFoundException();
  }

  @Post('/')
  public async create(
    @Body() body: CreateAlbumDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    checkUrlForSlash(req);
    return this.albumService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAlbumDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.albumService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.albumService.delete(id);
  }
}
