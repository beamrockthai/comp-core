import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { hashPassword } from 'src/helper/common';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // async paginationUser(options: IPaginationOptions) {
  //   const qb = this.repo.createQueryBuilder('u');

  //   // FIXME:
  //   // if (filter.username) {
  //   //   qb.andWhere('u.username ILIKE :username', {
  //   //     username: '%' + filter.username + '%',
  //   //   });
  //   // }

  //   qb.select(['u.id', 'u.email', 'u.username']);

  //   return paginate<User>(qb, options);
  // }

  // async findById(id: number) {
  //   return this.repo.findOneBy({ id });
  // }

  // async findByUUID(uuid: string) {
  //   return this.repo.findOneBy({ uuid });
  // }

  // async findByEmail(email: string, withPassword?: boolean) {
  //   let builder = this.repo
  //     .createQueryBuilder('u')
  //     .where('u.email = :email', { email });

  //   if (withPassword) {
  //     builder = builder.addSelect('u.password');
  //   }

  //   return await builder.getOne();
  // }

  // async findByUsername(username: string) {
  //   const builder = this.repo
  //     .createQueryBuilder('u')
  //     .where('u.username = :username', { username });

  //   return await builder.getOne();
  // }

  // async findByEmailOrUsername(email: string) {
  //   const user = await this.repo.query(
  //     `(SELECT * FROM "user" u1 WHERE u1.email = $1 AND u1.deleted_at IS NULL LIMIT 1)
  //     UNION
  //     (SELECT * FROM "user" u2 WHERE u2.username = $1 AND u2.deleted_at IS NULL LIMIT 1);`,
  //     [email],
  //   );

  //   return await this.repo
  //     .createQueryBuilder('u')
  //     .addSelect('u.password')
  //     .where('u.id = :id', { id: user[0]['id'] })
  //     .getOne();
  // }

  // async findByIdExtend(id: number) {
  //   return await this.repo
  //     .createQueryBuilder('u')
  //     .leftJoin('u.profile', 'p')
  //     .where('u.id = :id', { id })
  //     .getOne();
  // }

  // async changePassword(user: User, password: string) {
  //   user.password = await hashPassword(password);

  //   return await this.repo.save(user);
  // }

  // async update(user: User) {
  //   return await this.repo.save(user);
  // }
}
