import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsMimeType,
  IsBoolean,
  IsArray,
  IsDate,
} from 'class-validator';
export class UserDto {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  identityId: string;

  @IsOptional()
  @IsString()
  photoUrl: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}

export class UserUpdateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  tel: string;

  @IsNotEmpty()
  @IsString()
  identityId: string;

  @IsOptional()
  @IsString()
  photoUrl: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;
}

// //Relete
export class CreateUserWithTournamentDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  tournamentId: number;
}
// export class UserUploadDto {
//   @IsNotEmpty()
//   originalName: string;

//   @IsNotEmpty()
//   @IsNumber()
//   size: number;

//   @IsNotEmpty()
//   @IsMimeType()
//   contentType: string;
// }

// export class UserChangePasswordDto {
//   @IsNotEmpty()
//   @IsString()
//   password: string;

//   @IsNotEmpty()
//   @IsString()
//   newPassword: string;
// }

// export class UserDto {
//   @IsNotEmpty()
//   @IsString()
//   email: string;

//   @IsNotEmpty()
//   password: string;

//   @IsOptional()
//   @IsString()
//   roleId: string;

//   @IsNotEmpty()
//   @IsString()
//   firstName: string;

//   @IsOptional()
//   @IsString()
//   lastName: string;

//   @IsOptional()
//   @IsBoolean()
//   active: boolean;

//   @IsOptional()
//   @IsString()
//   status: string;

//   @IsOptional()
//   @IsArray()
//   address: {
//     address: string;
//     country: string;
//     subDistrict: string;
//     district: string;
//     province: string;
//     postalCode: string;
//     type: string;
//     id?: string;
//   }[];

//   @IsOptional()
//   @IsString()
//   description: string;

//   @IsOptional()
//   @IsString()
//   tel: string;

//   @IsOptional()
//   @IsString()
//   identityId: string;

//   @IsOptional()
//   @IsString()
//   photoUrl: string;

//   @IsOptional()
//   @IsString()
//   dateOfBirth: Date;

//   @IsOptional()
//   @IsString()
//   startWork: Date;

//   @IsOptional()
//   @IsString()
//   endWork: Date;
// }
