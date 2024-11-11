import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dtos';
import { UserCRUDService } from '../services';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminRolesGuard } from 'src/auth/jwt-auth-admin.guard';

// @UseGuards(AdminRolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('/api/crud/users')
export class UsersCRUDController {
  constructor(
    private userService: UserCRUDService,
  ) {}

  @Get('/')
  async filter(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const filter = await this.userService.paginationUser(
      {
        page,
        limit,
      },
      {
        withProfile: false,
      },
    );
    return { success: true, data: filter };
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }

    return { success: true, data: user };
  }

  @Post('/')
  async createUser(@Body() dto: UserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new UnprocessableEntityException('email already exists');
    }

    const createdUser = await this.userService.create(dto);
    return { success: true, data: createdUser };
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserDto,
  ) {
    const user = await this.userService.findById(id, true);

    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }

    const updatedUser = await this.userService.update(dto, user);
    return { success: true, data: updatedUser };
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }

    await this.userService.softDelete(user);
    return { success: true, data: user };
  }

  @Put('/:id/undelete')
  async unDelete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id, true);

    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }

    await this.userService.undelete(user);
    return { success: true, data: user };
  }
}
