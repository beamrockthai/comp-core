// import {
//   BadRequestException,
//   Body,
//   Controller,
//   ForbiddenException,
//   Get,
//   Post,
//   Req,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { checkPassword } from 'src/helper/common';
// // import { AuthService } from '../services/auth.service';
// import { ExchaneAccessToken, LoginDto } from '../auth.dto';
// import { UserCRUDService } from 'src/users/services';
// import { Request } from 'express';
// import dayjs from 'dayjs';
// // import { AdminService } from 'src/admins/services';

// @Controller('/api/auth')
// export class AuthController {
//   constructor(
//     // private svc: AuthService,
//     private userSvc: UserCRUDService,
//   ) // private adminSvc: AdminService,
//   {}

//   @Post('/signin')
//   async loginUser(@Body() dto: LoginDto) {
//     const user = await this.userSvc.findByEmail(dto.email, true);

//     const result = await checkPassword(dto.password, user.password);

//     if (!user || !result) {
//       throw new UnauthorizedException();
//     }
//     if (!user.active) {
//       throw new ForbiddenException('user is inactive');
//     }

//     // if (!result) {
//     //   throw new UnauthorizedException();
//     // }

//     // return await this.svc.generateAuthUserToken(user);
//   }

//   // @Post('/signin/admin')
//   // async loginAdmin(@Body() dto: LoginDto) {
//   //   // const admin = await this.adminSvc.findByEmail(dto.email, true);

//   //   if (!admin) {
//   //     throw new UnauthorizedException();
//   //   }
//   //   if (!admin.active) {
//   //     throw new ForbiddenException('user is inactive');
//   //   }

//   //   const result = await checkPassword(dto.password, admin.password);

//   //   if (!result) {
//   //     throw new UnauthorizedException();
//   //   }

//   //   return await this.svc.generateAuthAdminToken(admin);
//   // }

//   @Get('/me')
//   async me(@Req() req: Request) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       throw new BadRequestException('token not found');
//     }

//     const token = req.headers.authorization.split(' ')[1];

//     if (!token) {
//       throw new ForbiddenException();
//     }

//     try {
//       const sign = await this.svc.verifyAuthToken(token);
//       const me = await this.userSvc.findById(sign.sub);

//       if (!me) {
//         throw new ForbiddenException('user data not found');
//       }

//       return { ...sign, ...me };
//     } catch (error) {
//       throw new ForbiddenException('token has been expire');
//     }
//   }

//   @Post('/exchange-refresh-token')
//   async exchangeRefreshToken(@Body() dto: ExchaneAccessToken) {
//     const user = await this.svc.verifyAuthRefreshToken(dto.refreshToken);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     if (user.dueDate && dayjs().isAfter(user.dueDate)) {
//       throw new ForbiddenException('user duedate exceed');
//     }

//     const u = await this.userSvc.findById(user.sub);

//     if (!u) {
//       throw new UnauthorizedException();
//     }

//     const newAccessToken = await this.svc.generateAuthUserToken(u);

//     return { success: true, message: 'new token generated', newAccessToken };
//   }
// }
