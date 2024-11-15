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
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto, CategoryUpdateDto } from '../dtos/category.dto';

@UseGuards(JwtAuthGuard)
@Controller('/api/crud/category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  // @Get('/branch/:branchSlug')
  // async findAll(@Param('branchSlug') branchSlug: string) {
  //   return await this.service.findAll(branchSlug);
  // }

  @Get('/:categorySlug')
  async findById(@Param('categorySlug') categorySlug: string) {
    const product = await this.service.findBySlug(categorySlug);

    if (!product) {
      throw new UnprocessableEntityException();
    }
    return product;
  }

  @Post('/:branchSlug')
  async create(
    @Body() dto: CategoryCreateDto,
    @Param('branchSlug') branchSlug: string,
  ) {
    return await this.service.create(dto, branchSlug);
  }

  @Put('/:categorySlug')
  async update(
    @Param('categorySlug') categorySlug: string,
    @Body() dto: CategoryUpdateDto,
  ) {
    const category = await this.service.findBySlug(categorySlug);
    if (!category) {
      throw new UnprocessableEntityException();
    }

    return await this.service.update(dto, categorySlug);
  }

  @Delete('/:categorySlug')
  async delete(@Param('categorySlug') categorySlug: string) {
    const product = await this.service.findBySlug(categorySlug);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    await this.service.softDelete(product);
    return { success: true, data: product };
  }

  @Put('/:categorySlug/undelete')
  async undelete(@Param('categorySlug') categorySlug: string) {
    const product = await this.service.findBySlug(categorySlug, true);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    await this.service.undelete(product);
    return { success: true, data: product };
  }
}
