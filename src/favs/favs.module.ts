import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [InMemoryDBModule.forFeature('favorites')],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
