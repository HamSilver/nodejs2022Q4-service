import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { ArtistEntity } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Injectable()
export class ArtistService {
  constructor(private memoryArtistService: InMemoryDBService<ArtistEntity>) {}

  getAll(): ArtistEntity[] {
    return this.memoryArtistService.getAll();
  }

  getOne(id: string) {
    return this.memoryArtistService.get(id);
  }

  create(body: CreateArtistDto): ArtistEntity {
    return this.memoryArtistService.create(body, uuidv4);
  }

  update(id: string, body: UpdateArtistDto): ArtistEntity {
    const currentArtist = this.memoryArtistService.get(id);
    if (currentArtist) {
      const newArtist = {
        ...currentArtist,
        ...body,
      };
      this.memoryArtistService.update(newArtist);
      return newArtist;
    }
    throw new NotFoundException('Artist not found');
  }

  delete(id: string): void {
    if (this.memoryArtistService.get(id)) {
      this.memoryArtistService.delete(id);
    } else {
      throw new NotFoundException('Artist not found');
    }
  }
}
