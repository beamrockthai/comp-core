import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
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
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ContentsService } from '../services/contents.service';
import { Contents } from '../entities/content.entity';
import { ContentDto } from '../dtos/content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRolesGuard } from 'src/auth/jwt-auth-user.guard';

// @UseGuards(UserRolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('api/crud/contents')
export class ContentsController {
  constructor(private readonly service: ContentsService) {}

  @Get('/admin')
  async findAll() {
    return await this.service.findAll();
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const content = await this.service.findById(id);
    if (!content) {
      throw new NotFoundException();
    }
    return content;
  }

  @Get('/')
  async findWithPaginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('service') service?: string,
  ) {
    return await this.service.findWithPagination(
      {
        page,
        limit,
      },
      service,
    );
  }

  @Post('/')
  async create(@Req() req: Request, @Body() dto: ContentDto) {
    const content = new Contents();
    content.title = dto.title;
    content.subTitle = dto.subTitle;
    content.description = dto.description;
    content.service = dto.service;
    content.imageUrl = dto.imageUrl;

    try {
      return await this.service.create(content);
    } catch (error) {
      throw new UnprocessableEntityException('Failed to create entity');
    }
  }

  @Put('/:id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ContentDto,
  ) {
    const content = await this.service.findById(id);
    if (!content) {
      throw new NotFoundException();
    }

    content.title = dto.title;
    content.subTitle = dto.subTitle;
    content.description = dto.description;
    content.service = dto.service;
    content.imageUrl = dto.imageUrl;

    try {
      return await this.service.update(content);
    } catch (error) {
      throw new UnprocessableEntityException('Failed to update entity');
    }
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const content = await this.service.findById(id);
    if (!content) {
      throw new NotFoundException();
    }
    await this.service.delete(id);
    return { message: 'Content deleted', success: true };
  }
}
