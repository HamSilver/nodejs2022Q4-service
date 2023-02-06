import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public artistId?: string | null;

  @IsString()
  @IsOptional()
  public albumId?: string | null;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public duration: number;
}

class UpdateTrackDto extends PartialType(CreateTrackDto) {}

export { CreateTrackDto, UpdateTrackDto };
