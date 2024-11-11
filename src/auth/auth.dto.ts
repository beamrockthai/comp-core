import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ExchaneAccessToken {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
