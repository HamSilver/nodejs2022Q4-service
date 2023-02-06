import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface AlbumEntity extends InMemoryDBEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}
