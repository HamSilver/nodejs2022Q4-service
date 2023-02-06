import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [InMemoryDBModule.forFeature('album')],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
