import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Model from 'src/model.entity';
import { Roles } from 'src/roles/entities';
// import { Branch, Organizations } from 'src/organizations/entities';
// import { Address } from 'src/address/entities';

@Entity('users')
@Index(['email'], { unique: true })
export class User extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  uuid: string;

  @Column({ type: 'citext' })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  identityId: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  startWork: Date;

  @Column({ nullable: true })
  endWork: Date;

  // @OneToMany(() => Address, (address) => address.userProfile)
  // address: Address[];

  // @ManyToOne(() => Roles, (roles) => roles.user)
  // role: Roles;
}
