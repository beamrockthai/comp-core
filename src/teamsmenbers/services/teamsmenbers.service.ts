import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TeamsMembers } from '../entities';
import {
  TeamsMembersCreateDto,
  TeamsMembersUpdateDto,
} from '../dtos/teamsmenbers.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';

@Injectable()
export class TeamsMembersService extends TypeOrmCrudService<TeamsMembers> {
  constructor(
    @InjectRepository(TeamsMembers) repo: Repository<TeamsMembers>,
    private em: EntityManager,
  ) {
    super(repo);
  }

  async create(dto: TeamsMembersCreateDto) {
    const teamsmembers: TeamsMembersCreateDto = {
      active: dto.active,
      memberName: dto.memberName,
    };

    return await this.repo.save(teamsmembers);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('teamsmembers')
      .addOrderBy('teamsmembers.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(slug: string) {
    const qb = this.repo
      .createQueryBuilder('teamsmembers')
      .where('teamsmembers.slug = :slug', { slug: slug });

    return await qb.getOne();
  }

  async softDelete(teamsmembers: TeamsMembers) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(teamsmembers);
    });
  }

  async undelete(teamsmembers: TeamsMembers) {
    await this.em.transaction(async (tx) => {
      await tx.recover(teamsmembers);
    });
  }

  async update(
    teamsmembers: TeamsMembersUpdateDto,
    dto: TeamsMembersUpdateDto,
  ) {
    teamsmembers.active = dto.active;
    teamsmembers.memberName = dto.memberName;

    const data = await this.repo.save(teamsmembers);
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
