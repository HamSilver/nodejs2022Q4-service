import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  @IsNotEmpty()
  public grammy: boolean;
}

class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export { CreateArtistDto, UpdateArtistDto };
