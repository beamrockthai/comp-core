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
import { ProductsService } from '../services/products.service';
import { ProductsCreateDto, ProductsUpdateDto } from '../dtos/products.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get('/branch/:branchSlug')
  async findAll(@Param('branchSlug') branchSlug: string) {
    return await this.service.findAll(branchSlug);
  }

  @Get('/:productSlug')
  async findBySlug(@Param('productSlug') productSlug: string) {
    const product = await this.service.findBySlug(productSlug);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    return product;
  }

  @Post('/branch/:branchSlug')
  async create(
    @Body() dto: ProductsCreateDto,
    @Param('branchSlug') branchSlug: string,
  ) {
    return await this.service.create(dto, branchSlug);
  }

  @Put('/:productSlug')
  async update(
    @Param('productSlug') productSlug: string,
    @Body() dto: ProductsUpdateDto,
  ) {
    const product = await this.service.findBySlug(productSlug);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    return await this.service.update(product, dto);
  }

  @Delete('/:branchSlug/:productSlug')
  async delete(
    @Param('productSlug') productSlug: string,
    @Param('branchSlug') branchSlug: string,
  ) {
    const product = await this.service.findBySlug(productSlug);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    await this.service.softDelete(product);
    return { success: true, data: product };
  }

  @Put('/:productSlug/undelete')
  async undelete(@Param('productSlug') productSlug: string) {
    const product = await this.service.findBySlug(productSlug, true);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    await this.service.undelete(product);
    return { success: true, data: product };
  }
}
