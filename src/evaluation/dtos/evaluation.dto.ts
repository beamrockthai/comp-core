import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class EvaluationCreateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsString()
  comments: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}

export class EvaluationUpdateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsString()
  comments: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}
