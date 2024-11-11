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
import { itemsService } from '../services/items.service';
import { ItemsCreateDto, ItemsUpdateDto } from '../dtos/items.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/crud/items')
export class itemsController {
  constructor(private readonly service: itemsService) {}

  @Get('/')
  async findProduct() {
    return await this.service.findItem();
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.findById(id);

    if (!product) {
      throw new UnprocessableEntityException();
    }

    return product;
  }

  @Get(':id/calculate')
  async calculateTotal(@Param('id') id: number) {
    return await this.service.calculateItms(id);
  }

  @Post('/')
  async create(@Body() dto: ItemsCreateDto) {
    return await this.service.create(dto);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ItemsUpdateDto,
  ) {
    const product = await this.service.findById(id);
    if (!product) {
      throw new UnprocessableEntityException();
    }

    product.title = dto.title;
    product.description = dto.description;
    product.quantity = dto.quantity;
    product.price = dto.price;

    return await this.service.update(product);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const product = await this.service.findById(id);
    if (!product) {
      throw new UnprocessableEntityException();
    }
    return await this.service.delete(id);
  }
}
