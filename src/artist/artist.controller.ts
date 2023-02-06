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
import { ArtistService } from './artist.service';
import { checkUrlForSlash } from 'src/utils/checkUrl';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    checkUrlForSlash(req);
    return this.artistService.getAll();
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    const result = this.artistService.getOne(id);
    if (result) {
      return this.artistService.getOne(id);
    }
    throw new NotFoundException();
  }

  @Post('/')
  public async create(
    @Body() body: CreateArtistDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    checkUrlForSlash(req);
    return this.artistService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateArtistDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.artistService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.artistService.delete(id);
  }
}
