import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Stages } from '../entities';
import { StagesCreateDto, StagesUpdateDto } from '../dtos/stages.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class StagesService extends TypeOrmCrudService<Stages> {
  constructor(
    @InjectRepository(Stages) repo: Repository<Stages>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: StagesCreateDto) {
    const stages: StagesUpdateDto = {
      active: dto.active,
      stageName: dto.stageName,
      stageOrder: dto.stageOrder,
      elimination: dto.elimination,
    };

    return await this.repo.save(stages);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('stages')
      .addOrderBy('stages.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('stages')
      .where('stages.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(stages: Stages) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(stages);
    });
  }

  async undelete(stages: Stages) {
    await this.em.transaction(async (tx) => {
      await tx.recover(stages);
    });
  }

  async update(stages: StagesUpdateDto, dto: StagesUpdateDto) {
    stages.active = dto.active;
    stages.stageName = dto.stageName;
    stages.stageOrder = dto.stageOrder;
    stages.elimination = dto.elimination;
    const data = await this.repo.save(stages);
    return data;
  }

  // code เก่า
  // constructor(
  //   @InjectRepository(Tournaments)
  //   repo: Repository<Tournaments>,
  //   private em: EntityManager,
  // ) {
  //   super(repo);
  // }

  // // async findAll(branchSlug: string) {
  // //   return await this.repo.find({
  // //     where: { branch: { slug: branchSlug } },
  // //   });
  // // }

  // async create(dto: CategoryCreateDto, branchSlug: string) {
  //   const product = new Category();
  //   product.name = dto.name;
  //   product.description = dto.description;

  //   return await this.repo.save(product);
  // }

  // async update(dto: CategoryUpdateDto, productSlug: string) {
  //   const product = await this.repo.findOne({
  //     where: { slug: productSlug },
  //   });
  //   if (!product) {
  //     throw new UnprocessableEntityException('Product not found');
  //   }
  //   product.name = dto.name;
  //   product.description = dto.description;

  //   return await this.repo.save(product);
  // }

  // async undelete(category: Category) {
  //   await this.em.transaction(async (tx) => {
  //     await tx.recover(category);
  //   });
  // }
}
