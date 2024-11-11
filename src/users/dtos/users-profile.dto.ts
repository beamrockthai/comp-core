import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class UserProfileDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  tel: string;

  @IsOptional()
  @IsString()
  identityId: string;

  @IsOptional()
  @IsString()
  photoUrl: string;

  @IsOptional()
  @IsString()
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  startWork: Date;

  @IsOptional()
  @IsString()
  endWork: Date;

  @IsOptional()
  @IsArray()
  address: {
    address: string;
    country: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
    type: string;
    id?: string;
  }[];
}
