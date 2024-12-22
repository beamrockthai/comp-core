import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Matches } from '../entities';
import { MatchesCreateDto, MatchesUpdateDto } from '../dtos/matches.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class MatchesService extends TypeOrmCrudService<Matches> {
  constructor(
    @InjectRepository(Matches) repo: Repository<Matches>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: MatchesCreateDto) {
    const matches: MatchesCreateDto = {
      active: dto.active,
      startTime: dto.startTime,
      endTime: dto.endTime,
      status: dto.status,
      scoreTeam1: dto.scoreTeam1,
      scoreTeam2: dto.scoreTeam2,
    };

    return await this.repo.save(matches);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('matches')
      .addOrderBy('matches.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('matches')
      .where('matches.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(matches: Matches) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(matches);
    });
  }

  async undelete(matches: Matches) {
    await this.em.transaction(async (tx) => {
      await tx.recover(matches);
    });
  }

  async update(matches: MatchesUpdateDto, dto: MatchesUpdateDto) {
    matches.active = dto.active;
    matches.startTime = dto.startTime;
    matches.endTime = dto.endTime;
    matches.status = dto.status;
    matches.scoreTeam1 = dto.scoreTeam1;
    matches.scoreTeam2 = dto.scoreTeam2;

    const data = await this.repo.save(matches);
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
