import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Tournaments } from '../entities';
import {
  TournamentsCreateDto,
  TournamentsUpdateDto,
} from '../dtos/tournaments.dto';
import { PaginatedOption, pagination } from 'src/helper/pagination';
import { User } from 'src/users/entities';

@Injectable()
export class TournamentsService extends TypeOrmCrudService<Tournaments> {
  constructor(
    @InjectRepository(Tournaments) repo: Repository<Tournaments>,
    private em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repo);
  }
  async create(dto: TournamentsCreateDto) {
    const tournaments: TournamentsCreateDto = {
      active: dto.active,
      tourNaments: dto.tourNaments,
      starDate: dto.starDate,
      endDate: dto.endDate,
      MaxRounds: dto.MaxRounds,
      userSlug: dto.userSlug,
    };

    return await this.repo.save(tournaments);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('tournaments')
      .addOrderBy('tournaments.created_at', 'DESC');

    return await pagination(qb, options);
  }

  async findBySlug(userSlug: string, withDeleted = false) {
    return await this.repo.findOne({
      where: { slug: userSlug },
      withDeleted,
    });
  }

  async findById(userId: number, withDeleted = false) {
    return await this.repo.findOne({
      where: { id: userId },
      withDeleted,
    });
  }

  // async findBySlug(slug: string) {
  //   const qb = this.repo
  //     .createQueryBuilder('tournaments')
  //     .leftJoinAndSelect('tournament.user', 'user')
  //     .where('tournament.slug = :slug', { slug });

  //   return await qb.getOne();
  // }
  async softDelete(tournaments: Tournaments) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(tournaments);
    });
  }

  async undelete(tournaments: Tournaments) {
    await this.em.transaction(async (tx) => {
      await tx.recover(tournaments);
    });
  }

  async update(tournaments: TournamentsUpdateDto, dto: TournamentsUpdateDto) {
    tournaments.active = dto.active;
    tournaments.tourNaments = dto.tourNaments;
    tournaments.starDate = dto.starDate;
    tournaments.endDate = dto.endDate;
    tournaments.MaxRounds = dto.MaxRounds;

    const data = await this.repo.save(tournaments);
    return data;
  }

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
