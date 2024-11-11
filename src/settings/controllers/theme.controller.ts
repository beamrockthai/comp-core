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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ThemeService } from '../services';
import { ThemeDto } from '../dtos/theme.dto';

@UseGuards(JwtAuthGuard)
@Controller('/api/settings/theme')
export class ThemeController {
  constructor(private readonly service: ThemeService) {}

  @Get('/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const theme = await this.service.findBySlug(slug);
    if (!theme) {
      throw new UnprocessableEntityException();
    }
    return theme;
  }

  @Put('/:slug')
  async update(@Param('slug') slug: string, @Body() dto: ThemeDto) {
    return await this.service.update(dto, slug);
  }
}
