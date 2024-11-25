import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Ranking } from '../entities';
import { RankingCreateDto, RankingUpdateDto } from '../dtos/ranking.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class RankingService extends TypeOrmCrudService<Ranking> {
  constructor(
    @InjectRepository(Ranking) repo: Repository<Ranking>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: RankingCreateDto) {
    const ranking: RankingCreateDto = {
      active: dto.active,
      score: dto.score,
      rank: dto.rank,
      description: dto.description,
      updatedAt: dto.updatedAt,
    };

    return await this.repo.save(ranking);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('ranking')
      .addOrderBy('ranking.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('ranking')
      .where('ranking.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(ranking: Ranking) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(ranking);
    });
  }

  async undelete(ranking: Ranking) {
    await this.em.transaction(async (tx) => {
      await tx.recover(ranking);
    });
  }

  async update(ranking: RankingUpdateDto, dto: RankingUpdateDto) {
    ranking.active = dto.active;
    ranking.score = dto.score;
    ranking.rank = dto.rank;
    ranking.description = dto.description;
    ranking.updatedAt = dto.updatedAt;

    const data = await this.repo.save(ranking);
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
