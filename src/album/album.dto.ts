import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public year: number;

  @IsString()
  @IsOptional()
  public artistId?: string | null;
}

class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

export { CreateAlbumDto, UpdateAlbumDto };
