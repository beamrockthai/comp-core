import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { EntityManager, Repository } from 'typeorm';

import { UserDto, UserProfileDto, UserUpdateDto } from '../dtos';
import { hashPassword } from 'src/helper/common';
// import { UserProfileService } from './user-profile.service';
import { RolesService } from 'src/roles/services';
import { User } from '../entities';
import { TournamentsService } from 'src/tournaments/services';
import { PaginatedOption, pagination } from 'src/helper/pagination';

//Create User
@Injectable()
export class UserCRUDService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo: Repository<User>,
    @Inject(forwardRef(() => TournamentsService)) // <-- ใช้ forwardRef ในการ import มาใช้งาน relate กับ TournamentsService
    private readonly TournamentsService: TournamentsService,
    private em: EntityManager,
  ) {
    super(repo);
  }
  async create(dto: UserDto) {
    // const tournament = await this.TournamentsService.findById(
    //   // <-- ใช้ this.TournamentsService ในการเรียกใช้งาน function จาก TournamentsService
    //   dto.tournamentId,
    // );
    // if (!tournament) {
    //   throw new UnprocessableEntityException('tournament not found');
    // }

    const user = new User();
    user.email = dto.email;
    user.active = dto.active;
    user.status = dto.status;
    user.password = await hashPassword(dto.password);
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.description = dto.description;
    user.tel = dto.tel;
    user.identityId = dto.identityId;
    user.photoUrl = dto.photoUrl;
    user.dateOfBirth = dto.dateOfBirth;
    // user.tournaments = [tournament]; // <-- ใส่ tournament ที่ได้จากการค้นหาจาก TournamentsService

    // const user: UserDto = {
    //   email: dto.email,
    //   active: dto.active,
    //   status: dto.status,
    //   password: dto.password,
    //   firstName: dto.firstName,
    //   lastName: dto.lastName,
    //   description: dto.description,
    //   tel: dto.tel,
    //   identityId: dto.identityId,
    //   photoUrl: dto.photoUrl,
    //   dateOfBirth: dto.dateOfBirth,
    // };

    return await this.repo.save(user);
  }

  async findWithPagination(options: PaginatedOption, filter: any) {
    const qb = this.repo
      .createQueryBuilder('user')
      .addOrderBy('user.created_at', 'DESC');
    return await pagination(qb, options);
  }

  async findBySlug(userSlug: string, info?: string) {
    if (info === 'jointourn') {
      return await this.repo.findOne({
        where: { slug: userSlug },
        relations: ['tournaments'],
      });
    }
    return await this.repo.findOne({
      where: { slug: userSlug },
    });
  }

  async softDelete(user: User) {
    await this.em.transaction(async (tx) => {
      await tx.softRemove(user);
    });
  }

  async undelete(user: User) {
    await this.em.transaction(async (tx) => {
      await tx.recover(user);
    });
  }

  async restore(id: string) {
    return await this.repo.restore(id);
  }

  async update(user: UserUpdateDto, dto: UserUpdateDto) {
    // const tournament = await this.TournamentsService.findBySlug(
    //   dto.tournamentId,
    // );
    // if (!tournament) {
    //   throw new UnprocessableEntityException('tournament not found');
    // }
    user.email = dto.email;
    user.active = dto.active;
    user.status = dto.status;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.description = dto.description;
    user.tel = dto.tel;
    user.identityId = dto.identityId;
    user.photoUrl = dto.photoUrl;
    user.dateOfBirth = dto.dateOfBirth;
    // user.tournaments = [tournament];

    const data = await this.repo.save(user);
    return data;
  }

  // FINDBYID
  // async findById(id: string) {
  //   const qb = this.repo
  //     .createQueryBuilder('user')
  //     // .leftJoinAndSelect('user.tournaments', 'tournaments')
  //     .where('user.id = :id', { id });

  //   return await qb.getOne();
  // }

  // async findBySlug(slug: string) {
  //   const qb = this.repo
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.tournaments', 'tournaments') // <-- ชื่อ field ใน user.entity คือ 'tournaments'
  //     .where('user.slug = :slug', { slug });

  //   return await qb.getOne();
  // }
  // relation ship Entity

  // async findUserWithTourNaments(userId: string): Promise<User> {
  //   return this.repo.findOne({
  //     where: { slage: userId },
  //     relations: ['tourNaments'],
  //   });
  // }

  //Update User
}

//function id before
//
// async findById(id: string) {
//   const qb = this.repo
//     .createQueryBuilder('user')
//     .where('user.id = :id', { id: id });
//   // .andWhere('projects.organizationId = :organizationId', {
//   //   organizationId: organizationId,
//   // });
//   return await qb.getOne();
// }

// async findBySlug(slug: string) {
//   const qb = this.repo
//     .createQueryBuilder('user')
//     .where('user.slug = :slug', { slug: slug });
//    .andWhere('projects.organizationId = :organizationId', {
//      organizationId: organizationId,
//   });
//   return await qb.getOne();
// }

// Code before
// @Injectable()
// export class UserCRUDService extends TypeOrmCrudService<UserDto> {
//   constructor(
//     private em: EntityManager,
//     @InjectRepository(User) repo: Repository<UserDto>,
//     // private readonly profileService: UserProfileService,
//     private readonly roleService: RolesService,
//   ) {
//     super(repo);
//   }

//   async create(
//     dto: UserDto,
//     // options?: {
//     //   branchSlug?: string;
//     //   organizationSlug?: string;
//     // },
//   ) {
//     const user = new User();
//     user.email = dto.email;
//     user.password = await hashPassword(dto.password);
//     user.firstName = dto.firstName;
//     user.lastName = dto.lastName;
//     user.active = dto.active;
//     user.status = dto.status;

//     if (options) {
//       if (options.branchSlug) {
//         const branch = await this.branchService.findBySlug(options.branchSlug);
//         if (!branch) {
//           throw new UnprocessableEntityException();
//         }
//         user.branch = branch;
//       } else if (options.organizationSlug) {
//         const organization = await this.organizationService.findBySlug(
//           options.organizationSlug,
//         );
//         if (!organization) {
//           throw new UnprocessableEntityException();
//         }
//         user.organizations = (user.organizations || [])
//           .concat(organization)
//           .filter(
//             (value, index, array) =>
//               array.findIndex((item) => item.id === value.id) === index,
//           );
//       }
//     }

//     if (dto.roleId) {
//       const role = await this.roleService.findBySlug(dto.roleId);
//       if (!role) {
//         throw new UnprocessableEntityException();
//       }
//       user.role = role;
//     }

//     const profile = new UserProfile();
//     profile.description = dto.description;
//     profile.tel = dto.tel;
//     profile.identityId = dto.identityId;
//     profile.photoUrl = dto.photoUrl;
//     profile.dateOfBirth = dto.dateOfBirth;
//     profile.startWork = dto.startWork;
//     profile.endWork = dto.endWork;
//     profile.address = [];

//     for (const addr of dto.address) {
//       profile.address.push(await this.addressService.create(addr));
//     }

//     const createdProfile = await this.profileService.update(profile);

//     user.profile = createdProfile;

//     const { password, ...createdUser } = await this.repo.save(user);

//     return createdUser;
//   }

//   async update(dto: UserDto, user: User) {
//     const profile = await this.profileService.findByUserId(user.id);
//     if (!profile) {
//       throw new UnprocessableEntityException();
//     }

//     profile.description = dto.description;
//     profile.tel = dto.tel;
//     profile.identityId = dto.identityId;
//     profile.photoUrl = dto.photoUrl;
//     profile.dateOfBirth = dto.dateOfBirth;
//     profile.startWork = dto.startWork;
//     profile.endWork = dto.endWork;
//     profile.address = [];

//     if (dto.roleId) {
//       const role = await this.roleService.findBySlug(dto.roleId);
//       if (!role) {
//         throw new UnprocessableEntityException();
//       }
//       user.role = role;
//     }

//     for (const addr of dto.address) {
//       if (addr.id) {
//         const address = await this.addressService.findBySlug(addr.id);
//         if (!address) {
//           throw new UnprocessableEntityException();
//         }
//         address.address = addr.address;
//         address.country = addr.country;
//         address.subDistrict = addr.subDistrict;
//         address.district = addr.district;
//         address.province = addr.province;
//         address.postalCode = addr.postalCode;
//         address.type = addr.type;
//         profile.address.push(await this.addressService.update(address));
//       } else {
//         profile.address.push(await this.addressService.create(addr));
//       }
//     }

//     const updatedProfile = await this.profileService.update(profile);

//     user.email = dto.email;
//     user.password = await hashPassword(dto.password);
//     user.firstName = dto.firstName;
//     user.lastName = dto.lastName;
//     user.active = dto.active;
//     user.status = dto.status;
//     user.profile = updatedProfile;

//     const { password, ...updatedUser } = await this.repo.save(user);

//     return updatedUser;
//   }

//   async paginationUser(options: IPaginationOptions, filter?: any) {
//     const qb = this.repo.createQueryBuilder('u');

//     if (filter?.withProfile) {
//       qb.leftJoinAndSelect('u.profile', 'profile');
//     }

//     qb.addOrderBy('u.created_at', 'DESC');

//     return paginate<User>(qb.withDeleted(), options);
//   }

//   async findById(id: number, withDeleted = false) {
//     const qb = await this.repo.findOne({
//       where: { id: id },
//       withDeleted,
//       relations: {
//         profile: true,
//       },
//     });

//     return qb;
//   }

//   async findByUuid(uuId: string, withDeleted = false) {
//     const qb = await this.repo.findOne({
//       where: { uuid: uuId },
//       withDeleted,
//       relations: {
//         profile: true,
//       },
//     });

//     return qb;
//   }

//   async findByEmail(email: string, withPassword = false) {
//     const qb = this.repo
//       .createQueryBuilder('u')
//       .where('u.email = :email', { email: email });

//     if (withPassword) {
//       qb.addSelect('u.password');
//     }

//     return await qb.withDeleted().getOne();
//   }

//   async softDelete(user: User) {
//     await this.em.transaction(async (tx) => {
//       await tx.softRemove(user);
//     });
//   }

//   async undelete(user: User) {
//     await this.em.transaction(async (tx) => {
//       await tx.recover(user);
//     });
//   }

//   async findUserProfile(id: number) {
//     return await this.em
//       .createQueryBuilder(UserProfile, 'up')
//       .where('up.user_id = :uid', { uid: id })
//       .getOne();
//   }

//   async findByOrganizationSlug(slug: string) {
//     const users = await this.repo.find({
//       relations: ['profile', 'role'],
//       where: {
//         organizations: {
//           slug: slug,
//         },
//       },
//     });

//     return users;
//   }

//   async findByBranchSlug(slug: string) {
//     const users = await this.repo.find({
//       relations: ['profile', 'role'],
//       where: {
//         branch: {
//           slug: slug,
//         },
//       },
//     });

//     return users;
//   }

//   // async addOrganizationAccess(userId: number, organizationSlug: string) {
//   //   const user = await this.findById(userId);
//   //   if (!user) {
//   //     throw new UnprocessableEntityException();
//   //   }

//   //   const organization = await this.organizationService.findBySlug(
//   //     organizationSlug,
//   //   );
//   //   if (!organization) {
//   //     throw new UnprocessableEntityException();
//   //   }

//   //   const access = new OrganizationsAccess();
//   //   access.user = user;
//   //   access.organization = organization;

//   //   return await this.accessService.update(access);
//   // }

//   // async addOrganizationBranchAccess(userId: number, branchSlug: string) {
//   //   const user = await this.findById(userId);
//   //   if (!user) {
//   //     throw new UnprocessableEntityException();
//   //   }

//   //   const branch = await this.branchService.findBySlug(branchSlug);
//   //   if (!branch) {
//   //     throw new UnprocessableEntityException();
//   //   }

//   //   const access = new OrganizationsAccess();
//   //   access.user = user;
//   //   access.organizationBranch = branch;

//   //   return await this.accessService.update(access);
//   // }
// }
