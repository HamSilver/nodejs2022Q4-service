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
import { TrackService } from './track.service';
import { checkUrlForSlash } from 'src/utils/checkUrl';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    checkUrlForSlash(req);
    return this.trackService.getAll();
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    const result = this.trackService.getOne(id);
    if (result) {
      return this.trackService.getOne(id);
    }
    throw new NotFoundException();
  }

  @Post('/')
  public async create(
    @Body() body: CreateTrackDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    checkUrlForSlash(req);
    return this.trackService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTrackDto,
    @Headers('Content-Type') header: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    if (header !== 'application/json') {
      throw new ForbiddenException('Wrong Content-Type');
    }
    return this.trackService.update(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.trackService.delete(id);
  }
}
