import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class RankingCreateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  rank: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
}

export class RankingUpdateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  rank: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
}
