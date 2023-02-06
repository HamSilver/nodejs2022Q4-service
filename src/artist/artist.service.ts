import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { ModuleRef } from '@nestjs/core';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService implements OnModuleInit {
  private albumService: AlbumService;

  constructor(
    private memoryArtistService: InMemoryDBService<ArtistEntity>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.albumService = this.moduleRef.get(AlbumService, { strict: false });
  }

  getAll(): ArtistEntity[] {
    return this.memoryArtistService.getAll();
  }

  getOne(id: string) {
    return this.memoryArtistService.get(id);
  }

  create(body: CreateArtistDto): ArtistEntity {
    return this.memoryArtistService.create(body, uuidv4);
  }

  update(id: string, body: UpdateArtistDto): ArtistEntity {
    const currentArtist = this.memoryArtistService.get(id);
    if (currentArtist) {
      const newArtist = {
        ...currentArtist,
        ...body,
      };
      this.memoryArtistService.update(newArtist);
      return newArtist;
    }
    throw new NotFoundException('Artist not found');
  }

  delete(id: string): void {
    if (this.memoryArtistService.get(id)) {
      const foundAlbums = this.albumService.getByArtist(id);
      foundAlbums.forEach((albumId) => this.albumService.delete(albumId.id));
      this.memoryArtistService.delete(id);
    } else {
      throw new NotFoundException('Artist not found');
    }
  }
}
