import { IsString, IsNotEmpty, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class SettingDto {
  @IsNotEmpty()
  @IsString()
  organizationType: string;
  
  @IsNotEmpty()
  @IsString()
  taxId: string;
  
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isVatRegistered: boolean;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  tel: string;
  
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsString()
  bankAccountName: string;

  @IsNotEmpty()
  @IsString()
  bankAccountNo: string;

  @IsNotEmpty()
  @IsString()
  bankBranch: string;
}
