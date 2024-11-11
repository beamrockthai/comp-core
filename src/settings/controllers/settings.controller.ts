import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Put,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { SettingDto } from '../dtos/setting.dto';
import { Settings } from '../entities';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get('/')
  async findSettings() {
    return await this.service.findSettings();
  }

  @Get('/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const setting = await this.service.findBySlug(slug);
    if (!setting) {
      throw new UnprocessableEntityException();
    }
    return setting;
  }

  @Post('/organization/:organizationSlug')
  async createOrganization(@Body() dto: SettingDto, @Param('organizationSlug') organizationSlug: string) {
      return await this.service.create(dto, { organizationSlug: organizationSlug });
  }

  @Post('/branch/:branchSlug')
  async createBranch(@Body() dto: SettingDto, @Param('branchSlug') branchSlug: string) {
      return await this.service.create(dto, { branchSlug: branchSlug });
  }

  @Put('/:slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: SettingDto,
  ) {
    return await this.service.update(dto, slug);
  }

  @Delete('/:slug')
  async delete(@Param('slug') slug: string) {
    const setting = await this.service.findBySlug(slug);
    if (!setting) {
      throw new UnprocessableEntityException();
    }
    await this.service.softDelete(setting);
    return { success: true , data: setting};
  }

  @Put('/:slug/undelete')
  async undelete(@Param('slug') slug: string) {
    const setting = await this.service.findBySlug(slug);
    if (!setting) {
      throw new UnprocessableEntityException();
    }
    await this.service.unDelete(setting);
    return { success: true , data: setting};
  }
}
