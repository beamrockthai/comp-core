import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Category } from '../entities/category.entity';
import { CategoryCreateDto, CategoryUpdateDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    repo: Repository<Category>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  // async findAll(branchSlug: string) {
  //   return await this.repo.find({
  //     where: { branch: { slug: branchSlug } },
  //   });
  // }

  async findBySlug(productSlug: string, withDeleted = false) {
    return await this.repo.findOne({
      where: { slug: productSlug },
      withDeleted,
    });
  }

  async create(dto: CategoryCreateDto, branchSlug: string) {
    const product = new Category();
    product.name = dto.name;
    product.description = dto.description;

    return await this.repo.save(product);
  }

  async update(dto: CategoryUpdateDto, productSlug: string) {
    const product = await this.repo.findOne({
      where: { slug: productSlug },
    });
    if (!product) {
      throw new UnprocessableEntityException('Product not found');
    }
    product.name = dto.name;
    product.description = dto.description;

    return await this.repo.save(product);
  }

  async softDelete(category: Category) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(category);
    });
  }

  async undelete(category: Category) {
    await this.em.transaction(async (tx) => {
      await tx.recover(category);
    });
  }
}
