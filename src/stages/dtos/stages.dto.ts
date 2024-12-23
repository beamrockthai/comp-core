import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class StagesCreateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  stageName: string;

  @IsNotEmpty()
  @IsNumber()
  stageOrder: number;

  @IsNotEmpty()
  @IsBoolean()
  elimination: boolean;
}

export class StagesUpdateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  stageName: string;

  @IsNotEmpty()
  @IsNumber()
  stageOrder: number;

  @IsNotEmpty()
  @IsBoolean()
  elimination: boolean;
}
