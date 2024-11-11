import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserCRUDService } from '../services';
import { UserDto } from '../dtos';

@UseGuards(JwtAuthGuard)
@Controller('/api/users/organization/branch')
export class BranchUsersController {
  constructor(
    private userService: UserCRUDService,
  ) {}

  @Get('/:slug')
  async findUsers(@Param('slug') slug: string) {
    const users = await this.userService.findByBranchSlug(slug);
    return { success: true, data: users };
  }
  
  @Post('/:slug')
  async createUser(@Body() dto: UserDto, @Param('slug') slug: string) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new UnprocessableEntityException('user already exists');
    }
    const newUser = await this.userService.create(dto, { branchSlug: slug });
    return { success: true, data: newUser };
  }
}