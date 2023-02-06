import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface ArtistEntity extends InMemoryDBEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
