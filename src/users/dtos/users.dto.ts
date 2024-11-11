import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsMimeType,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class UserUploadDto {
  @IsNotEmpty()
  originalName: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsMimeType()
  contentType: string;
}

export class UserChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  roleId: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  status: string;

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
}
