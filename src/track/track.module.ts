import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [InMemoryDBModule.forFeature('track')],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
