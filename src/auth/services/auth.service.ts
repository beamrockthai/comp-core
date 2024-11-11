// import { BadRequestException, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import * as crypto from 'crypto';
// import dayjs from 'dayjs';
// import { User } from 'src/users/entities';
// import { EntityManager } from 'typeorm';
// import { AdminRole, UserRole } from '../constants';
// // import { Admin } from 'src/admins/entities';

// @Injectable()
// export class AuthService {
//   constructor(
//     private configService: ConfigService,
//     private jwtService: JwtService,
//     private em: EntityManager,
//   ) {}

//   async generateAuthUserToken(user: User) {
//     const payload: any = {
//       sub: user.id,
//       role: UserRole
//     };

//     const accessToken = this.jwtService.sign(payload, {
//       secret: this.getSignSecret(),
//       expiresIn: '6h',
//     });

//     const refreshToken = this.jwtService.sign(payload, {
//       secret: this.getRefreshSecret(),
//       expiresIn: '30d',
//     });

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }
//   async generateAuthAdminToken(admin: Admin) {
//     const payload: any = {
//       sub: admin.id,
//       role: AdminRole
//     };

//     const accessToken = this.jwtService.sign(payload, {
//       secret: this.getSignSecret(),
//       expiresIn: '6h',
//     });

//     const refreshToken = this.jwtService.sign(payload, {
//       secret: this.getRefreshSecret(),
//       expiresIn: '30d',
//     });

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   async verifyForgotPasswordToken(token: string) {
//     return this.jwtService.verify(token, {
//       secret: this.getResetPasswordSecret(),
//     });
//   }

//   async signResetPasswordToken(token: string, expiredAt?: Date) {
//     const payload: any = {
//       sub: token,
//     };

//     const secret = this.getResetPasswordSecret();

//     const now = dayjs();
//     const exp = expiredAt || now.add(1, 'hour').toDate();
//     const expiresIn = dayjs(exp).diff(exp);

//     const signed = this.jwtService.sign(payload, {
//       secret,
//       expiresIn,
//     });

//     return signed;
//   }

//   async verifyAuthToken(token: string) {
//     return this.jwtService.verify(token, {
//       secret: this.getSignSecret(),
//     });
//   }

//   async verifyAuthRefreshToken(token: string) {
//     try {
//       const refreshToken = this.jwtService.verify(token, {
//         secret: this.getRefreshSecret(),
//       });

//       if (!refreshToken) {
//       }

//       return refreshToken;
//     } catch (error) {
//       throw new BadRequestException('invalid token');
//     }
//   }

//   randomDummyPassword(): string {
//     return crypto.randomBytes(32).toString('hex');
//   }

//   private getSignSecret(): string {
//     return this.configService.get<string>('APP_JWT_SIGN_SECRET');
//   }

//   private getRefreshSecret(): string {
//     return this.configService.get<string>('APP_JWT_REFRESH_SECRET');
//   }

//   private getResetPasswordSecret(): string {
//     return this.configService.get<string>('APP_JWT_RESET_PASSWORD_SECRET');
//   }
// }
