import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TrackEntity } from './entities/track.entity';
import { ModuleRef } from '@nestjs/core';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService implements OnModuleInit {
  private artistService: ArtistService;
  private albumService: AlbumService;

  constructor(
    private memoryTrackService: InMemoryDBService<TrackEntity>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.albumService = this.moduleRef.get(AlbumService, { strict: false });
  }

  getAll(): TrackEntity[] {
    return this.memoryTrackService.getAll();
  }

  getByArtist(id: string): TrackEntity[] {
    return this.memoryTrackService.query((record) => record.artistId === id);
  }

  getByAlbum(id: string): TrackEntity[] {
    return this.memoryTrackService.query((record) => record.albumId === id);
  }

  getOne(id: string) {
    return this.memoryTrackService.get(id);
  }

  create(body: CreateTrackDto): TrackEntity {
    const { artistId, albumId } = body;
    this.checkForArtist(artistId);
    this.checkForAlbum(albumId);
    return this.memoryTrackService.create(body, uuidv4);
  }

  update(id: string, body: UpdateTrackDto): TrackEntity {
    const currentTrack = this.memoryTrackService.get(id);
    const { artistId, albumId } = body;
    this.checkForArtist(artistId);
    this.checkForAlbum(albumId);
    if (currentTrack) {
      const newTrack = {
        ...currentTrack,
        ...body,
      };
      this.memoryTrackService.update(newTrack);
      return newTrack;
    }
    throw new NotFoundException('Track not found');
  }

  delete(id: string): void {
    if (this.memoryTrackService.get(id)) {
      this.memoryTrackService.delete(id);
    } else {
      throw new NotFoundException('Track not found');
    }
  }

  checkForArtist(artistId: string): void {
    if (artistId && !this.artistService.getOne(artistId)) {
      throw new NotFoundException('Artist not found');
    }
  }

  checkForAlbum(albumId: string): void {
    if (albumId && !this.albumService.getOne(albumId)) {
      throw new NotFoundException('Album not found');
    }
  }
}
