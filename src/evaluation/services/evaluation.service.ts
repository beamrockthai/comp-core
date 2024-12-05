import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Evaluation } from '../entities';
import {
  EvaluationCreateDto,
  EvaluationUpdateDto,
} from '../dtos/evaluation.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class EvaluationService extends TypeOrmCrudService<Evaluation> {
  constructor(
    @InjectRepository(Evaluation) repo: Repository<Evaluation>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: EvaluationCreateDto) {
    const evaluation: EvaluationCreateDto = {
      active: dto.active,
      score: dto.score,
      comments: dto.comments,
      createdAt: dto.createdAt,
    };

    return await this.repo.save(evaluation);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('evaluation')
      .addOrderBy('evaluation.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('evaluation')
      .where('evaluation.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(evaluation: Evaluation) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(evaluation);
    });
  }

  async undelete(evaluation: Evaluation) {
    await this.em.transaction(async (tx) => {
      await tx.recover(evaluation);
    });
  }

  async update(evaluation: EvaluationUpdateDto, dto: EvaluationUpdateDto) {
    evaluation.active = dto.active;
    evaluation.score = dto.score;
    evaluation.comments = dto.comments;
    evaluation.createdAt = dto.createdAt;

    const data = await this.repo.save(evaluation);
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
