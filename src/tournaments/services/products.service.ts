import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProductsCreateDto, ProductsUpdateDto } from '../dtos/products.dto';
import { Products } from '../entities';
import { CategoryService } from './category.service';
@Injectable()
export class ProductsService extends TypeOrmCrudService<Products> {
  constructor(
    @InjectRepository(Products)
    repo: Repository<Products>,
    private readonly categoryService: CategoryService,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async findAll(banchSlug: string) {
    return await this.repo.find({
      relations: ['category'],
    });
  }

  async findBySlug(productSlug: string, withDeleted = false) {
    return await this.repo.findOne({
      where: { slug: productSlug },
      withDeleted,
      relations: ['category'],
    });
  }

  async findBySlugs(branchSlug: string, productSlugs: string[]) {
    return await this.repo.find({
      where: {
        slug: In([...productSlugs]),
      },
      relations: ['category'],
    });
  }

  async create(dto: ProductsCreateDto, branchSlug: string) {
    const category = await this.categoryService.findBySlug(dto.categoryId);
    if (!category) {
      throw new UnprocessableEntityException('Category not found');
    }
    const product = new Products();
    product.title = dto.title;
    product.description = dto.description;
    product.quantity = dto.quantity;
    product.price = dto.price;
    product.subTotal = dto.subTotal;
    product.isVat = dto.isVat;
    product.category = category;

    return await this.repo.save(product);
  }

  async update(product: Products, dto: ProductsUpdateDto) {
    const category = await this.categoryService.findBySlug(dto.categoryId);
    if (!category) {
      throw new UnprocessableEntityException('Category not found');
    }
    product.title = dto.title;
    product.description = dto.description;
    product.quantity = dto.quantity;
    product.price = dto.price;
    product.subTotal = dto.subTotal;
    product.isVat = dto.isVat;
    product.category = category;
    return await this.repo.save(product);
  }

  async softDelete(product: Products) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(product);
    });
  }

  async undelete(product: Products) {
    await this.em.transaction(async (tx) => {
      await tx.recover(product);
    });
  }
}
