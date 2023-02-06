import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { AlbumEntity } from './entities/album.entity';
import { ModuleRef } from '@nestjs/core';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService implements OnModuleInit {
  private artistService: ArtistService;

  constructor(
    private memoryAlbumService: InMemoryDBService<AlbumEntity>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
  }

  getAll(): AlbumEntity[] {
    return this.memoryAlbumService.getAll();
  }

  getByArtist(id: string): AlbumEntity[] {
    return this.memoryAlbumService.query((record) => record.artistId === id);
  }

  getOne(id: string) {
    return this.memoryAlbumService.get(id);
  }

  create(body: CreateAlbumDto): AlbumEntity {
    const { artistId } = body;
    this.checkForArtist(artistId);
    return this.memoryAlbumService.create(body, uuidv4);
  }

  update(id: string, body: UpdateAlbumDto): AlbumEntity {
    const currentAlbum = this.memoryAlbumService.get(id);
    const { artistId } = body;
    this.checkForArtist(artistId);
    if (currentAlbum) {
      const newAlbum = {
        ...currentAlbum,
        ...body,
      };
      this.memoryAlbumService.update(newAlbum);
      return newAlbum;
    }
    throw new NotFoundException('Album not found');
  }

  delete(id: string): void {
    if (this.memoryAlbumService.get(id)) {
      this.memoryAlbumService.delete(id);
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  checkForArtist(artistId: string): void {
    if (artistId && !this.artistService.getOne(artistId)) {
      throw new NotFoundException('Artist not found');
    }
  }
}
