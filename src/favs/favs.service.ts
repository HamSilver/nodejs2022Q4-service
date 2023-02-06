import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { FavoritesEntity } from './entities/favs.entity';
import { ModuleRef } from '@nestjs/core';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { FavoritesRepsonse } from './entities/favoritesResponse';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService implements OnModuleInit {
  private albumService: AlbumService;
  private trackService: TrackService;
  private artistService: ArtistService;

  constructor(
    private memoryFavsService: InMemoryDBService<FavoritesEntity>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.albumService = this.moduleRef.get(AlbumService, { strict: false });
    this.trackService = this.moduleRef.get(TrackService, { strict: false });
    this.memoryFavsService.create(
      { artists: [], albums: [], tracks: [] },
      () => '1',
    );
  }

  getAll(): FavoritesRepsonse {
    const storage = this.memoryFavsService.get('1');
    const allArtists = this.artistService.getAll();
    const artists = allArtists.filter((item) =>
      storage.artists.includes(item.id),
    );
    const allAlbums = this.albumService.getAll();
    const albums = allAlbums.filter((item) => storage.albums.includes(item.id));
    const allTracks = this.trackService.getAll();
    const tracks = allTracks.filter((item) => storage.tracks.includes(item.id));
    return { artists, albums, tracks };
  }

  addTrack(id: string): void {
    if (id && !this.trackService.getOne(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.tracks.includes(id)) {
      storage.tracks.push(id);
      this.memoryFavsService.update(storage);
    }
  }

  deleteTrack(id: string): void {
    if (id && !this.trackService.getOne(id)) {
      throw new NotFoundException('Track not found');
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.tracks.includes(id)) {
      throw new NotFoundException('Track not found');
    }
    storage.tracks = storage.tracks.filter((item) => item !== id);
    this.memoryFavsService.update(storage);
    return;
  }

  addAlbum(id: string): void {
    if (id && !this.albumService.getOne(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.albums.includes(id)) {
      storage.albums.push(id);
      this.memoryFavsService.update(storage);
    }
  }

  deleteAlbum(id: string): void {
    if (id && !this.albumService.getOne(id)) {
      throw new NotFoundException('Album not found');
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.albums.includes(id)) {
      throw new NotFoundException('Album not found');
    }
    storage.albums = storage.albums.filter((item) => item !== id);
    this.memoryFavsService.update(storage);
  }

  addArtist(id: string): void {
    if (id && !this.artistService.getOne(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.artists.includes(id)) {
      storage.artists.push(id);
      this.memoryFavsService.update(storage);
    }
  }

  deleteArtist(id: string): void {
    if (id && !this.artistService.getOne(id)) {
      throw new NotFoundException('Artist not found');
    }
    const storage = this.memoryFavsService.get('1');
    if (!storage.artists.includes(id)) {
      throw new NotFoundException('Artist not found');
    }
    storage.artists = storage.artists.filter((item) => item !== id);
    this.memoryFavsService.update(storage);
  }
}
