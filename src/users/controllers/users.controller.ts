import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { UserCRUDService } from '../services';
import { UserDto } from '../dtos';

// @UseGuards(JwtAuthGuard)
// @Controller('/api/users')
// export class UsersController {
//   constructor(
//     private userService: UserCRUDService,
//   ) {}

//   @Get('/:uuid')
//   async findByUuid(@Param('uuid') uuid: string) {
//     const user = await this.userService.findByUuid(uuid);
//     return { success: true, data: user };
//   }

//   @Put('/:uuid')
//   async updateUser(
//     @Body() dto: UserDto,
//     @Param('uuid') uuid: string,
//   ) {
//     const user = await this.userService.findByUuid(uuid);
//     if (!user) {
//       throw new UnprocessableEntityException('user not found');
//     }
//     const updatedUser = await this.userService.update(dto, user);
//     return { success: true, data: updatedUser };
//   }

//   @Delete('/:uuid')
//   async deleteUser(@Param('uuid') uuid: string) {
//     const user = await this.userService.findByUuid(uuid);
//     if (!user) {
//       throw new UnprocessableEntityException('user not found');
//     }
//     await this.userService.softDelete(user);
//     return { success: true , data: user };
//   }

//   @Put('/:uuid/undelete')
//   async undeleteUser(@Param('uuid') uuid: string) {
//     const user = await this.userService.findByUuid(uuid, true);
//     if (!user) {
//       throw new UnprocessableEntityException('user not found');
//     }
//     await this.userService.undelete(user);
//     return { success: true, data: user };
//   }

// @Get('/')
// async findUsers(@Req() req: Request) {
// // FIXME:
// const user = req.user;
// dto.id = user.id;
// const users = await this.service.paginationUser(dto, {
//   page: dto.page,
//   limit: dto.limit,
// });
// for (const u of users.items) {
//   const profile = await this.profileSvc.findByUserId(u.id);
//   if (profile) {
//     u['photoURL'] = profile.photoURL;
//   } else {
//     u['photoURL'] = '';
//   }
// }
// return users;
// }

// @Get('/:id')
// async findById(@Param('id', ParseIntPipe) id: number) {
//   const u = await this.service.findById(id);

//   if (!u) {
//     throw new NotFoundException();
//   }

//   const profile = await this.profileSvc.findByUserId(id);

//   if (profile) {
//     u['photoURL'] = profile.photoUrl;
//   }

//   return u;
// }

// @Get('/profile')
// async getProfile(@Req() req: Request) {
//   const user = req.user;
//   const profile = await this.profileSvc.findByUserId(user.id);

//   const data = {
//     ...user,
//     ...profile,
//   };

//   return data;
// }

// @Post('/profile')
// async updateProfile(@Req() req: Request, @Body() dto: UserProfileDto) {
//   const user = req.user;
//   const profile = await this.profileSvc.findByUserId(user.id);

//   try {
//     if (!profile) {
//       await this.profileSvc.create(user, dto);
//     } else {
//       await this.profileSvc.update(profile, dto);
//     }

//     return 'ok';
//   } catch (error) {
//     throw new ConflictException('username_already_exists');
//   }
// }

// @Post('/change-password')
// async changePassword(
//   @Req() req: Request,
//   @Body() dto: UserChangePasswordDto,
// ) {
//   const user = await this.service.findByEmail(req.user.email, true);
//   const checked = await checkPassword(dto.password, user.password);

//   if (!checked) {
//     throw new ForbiddenException();
//   }

//   await this.service.changePassword(user, dto.newPassword);

//   return 'ok';
// }

// @Get('/:id/profile')
// async getUserProfile(
//   @Req() req: Request,
//   @Param('id', ParseIntPipe) id: number,
// ) {
//   // FIXME implement check with isFollow, isPrivate(when doesn't follow together)
//   const user = req.user;

//   const owner = await this.service.findById(id);
//   const profile = await this.profileSvc.findByUserId(id);

//   const data: any = {
//     email: owner.email,
//     username: owner.username,
//   };

//   if (profile) {
//     data.displayName = profile.displayName;
//     data.description = profile.description;
//     data.photoURL = profile.photoURL;
//   }

//   data.follower = follower;
//   data.following = following;
//   data.postCount = countPosts;
//   data.isFollowing = followResult;

//   return data;
// }
// }
