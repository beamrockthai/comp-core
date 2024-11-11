import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Put,
  UseGuards,
  UnprocessableEntityException,
  Delete,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RoleDto } from '../dtos/role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRolesGuard } from 'src/auth/jwt-auth-user.guard';

@UseGuards(JwtAuthGuard)
// @UseGuards(UserRolesGuard)
@Controller('/api/crud/roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get('/organization/:organizationSlug')
  async findRoleByOrganizationSlug(
    @Param('organizationSlug') organizationSlug: string,
  ) {
    const data = await this.service.findRoleByOrganizationSlug(organizationSlug);
    return { success: true , data: data};
  }

  @Get('/branch/:branchSlug')
  async findRoleByBranchSlug(@Param('branchSlug') branchSlug: string) {
    const data = await this.service.findRoleByBranchSlug(branchSlug);
    return { success: true , data: data};
  }

  @Get('/:roleSlug')
  async findBySlug(@Param('roleSlug') roleSlug: string) {
    const role = await this.service.findBySlug(roleSlug);
    if (!role) {
      throw new UnprocessableEntityException();
    }
    return { success: true , data: role};
  }

  @Post('/branch/:branchSlug')
  async createByBranch(@Body() dto: RoleDto, @Param('branchSlug') branchSlug: string) {
    const data = await this.service.createByBranch(dto, branchSlug);
    return { success: true , data: data};
  }

  @Post('/organization/:organizationSlug')
  async createByOrganization(
    @Body() dto: RoleDto,
    @Param('organizationSlug') organizationSlug: string,
  ) {
    const data = await this.service.createByOrganization(dto, organizationSlug);
    return { success: true , data: data};
  }

  @Put('/:roleSlug')
  async update(@Param('roleSlug') roleSlug: string, @Body() dto: RoleDto) {
    const data = await this.service.update(roleSlug, dto);
    return { success: true , data: data};
  }

  @Delete('/:roleSlug')
  async delete(@Param('roleSlug') roleSlug: string) {
    const role = await this.service.findBySlug(roleSlug);
    if (!role) {
      throw new UnprocessableEntityException();
    }
    await this.service.softDelete(role);
    return { success: true , data: role};
  }

  @Put('/:roleSlug/undelete')
  async undelete(@Param('roleSlug') roleSlug: string) {
    const role = await this.service.findBySlug(roleSlug);
    if (!role) {
      throw new UnprocessableEntityException();
    }
    await this.service.unDelete(role);
    return { success: true , data: role};
  }
}
