import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class TournamentsCreateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  tourNaments: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  starDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  MaxRounds: number;

  @IsOptional()
  @IsString()
  userSlug: number;
}

export class TournamentsUpdateDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  tourNaments: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  starDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  MaxRounds: number;
}
