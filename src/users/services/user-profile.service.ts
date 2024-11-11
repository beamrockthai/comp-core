// import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityManager, Repository } from 'typeorm';

// import { User, UserProfile } from '../entities';
// import { UserProfileDto } from '../dtos/users-profile.dto';
// import { UserDto } from '../dtos';
// import { AddressService } from 'src/address/services';
// import { RolesService } from 'src/roles/services';

// @Injectable()
// export class UserProfileService {
//   constructor(
//     private em: EntityManager,
//     @InjectRepository(UserProfile) private repo: Repository<UserProfile>,
//     private readonly addressService: AddressService,
//     private readonly roleService: RolesService,
//   ) {}

//   async findByUserId(userId: number) {
//     const qb = await this.repo
//       .createQueryBuilder('p')
//       .leftJoinAndSelect('p.user', 'u')
//       .where('u.id = :userId', { userId })
//       .getOne();
//     return qb;
//   }

//   async update(profile: UserProfile) {
//     return await this.repo.save(profile);
//   }
// }
