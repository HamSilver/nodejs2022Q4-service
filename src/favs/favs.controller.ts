import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { FavsService } from './favs.service';
import { checkUrlForSlash } from 'src/utils/checkUrl';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get('/')
  public async getAll(@Req() req: any) {
    checkUrlForSlash(req);
    return this.favsService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  public async addTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  public async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.deleteAlbum(id);
  }
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    checkUrlForSlash(req);
    return this.favsService.deleteArtist(id);
  }
}
