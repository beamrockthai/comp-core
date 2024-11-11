import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Put,
  BadRequestException,
  UnprocessableEntityException,
  Req,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
  DefaultValuePipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { Contents } from '../entities/content.entity';
import { ContentDto } from '../dtos/content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRolesGuard } from 'src/auth/jwt-auth-user.guard';

// FIXME: Wait for brief
@Controller('/api/contents')
export class ContentsPreviewController {
  constructor(private readonly service: ContentsService) {}

  @Get('/home/preview')
  async findHomePreview() {
    return await this.service.findHomePreview();
  }

  @Get('/preview')
  async findPreview() {
    return await this.service.findPreview();
  }

  @Get('/preview/:id')
  async findPreviewById(@Param('id') id: string) {
    const content = await this.service.findPreviewBySlug(id);
    if (!content) {
      throw new NotFoundException();
    }
    return content;
  }

  @Get('/options')
  async findOptions() {
    return await this.service.findOptions();
  }
}