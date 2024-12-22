import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Teams } from '../entities';
import { TeamsCreateDto, TeamsUpdateDto } from '../dtos/teams.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class TeamsService extends TypeOrmCrudService<Teams> {
  constructor(
    @InjectRepository(Teams) repo: Repository<Teams>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: TeamsCreateDto) {
    const teams: TeamsCreateDto = {
      active: dto.active,
      nameTeam: dto.nameTeam,
      status: dto.status,
      description: dto.description,
    };

    return await this.repo.save(teams);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('teams')
      .addOrderBy('teams.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('teams')
      .where('teams.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(teams: Teams) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(teams);
    });
  }

  async undelete(teams: Teams) {
    await this.em.transaction(async (tx) => {
      await tx.recover(teams);
    });
  }

  async update(teams: TeamsUpdateDto, dto: TeamsUpdateDto) {
    teams.active = dto.active;
    teams.nameTeam = dto.nameTeam;
    teams.status = dto.status;
    teams.description = dto.description;
    const data = await this.repo.save(teams);
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
