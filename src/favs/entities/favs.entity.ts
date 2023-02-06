import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface FavoritesEntity extends InMemoryDBEntity {
  id: string;
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
