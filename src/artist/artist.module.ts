import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [InMemoryDBModule.forFeature('artist')],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
