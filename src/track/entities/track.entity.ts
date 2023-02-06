import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface TrackEntity extends InMemoryDBEntity {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
