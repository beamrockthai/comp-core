import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';
import { User } from 'src/users/entities';
// import { Branch, Organizations } from 'src/organizations/entities';

@Entity('roles')
export class Roles extends Model {
  @Column({ nullable: false })
  name: string;

  // @OneToMany(() => User, (user) => user.role)
  // user: User[];

  // @ManyToOne(() => Branch, (branch) => branch.roles)
  // branch: Branch;

  // @ManyToOne(() => Organizations, (organization) => organization.roles)
  // organization: Organizations;

  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column('jsonb', {
    nullable: false,
    default: {
      manageUsers: false,
      manageRoles: false,
      manageProjects: false,
      manageProducts: false,
      readAnalytics: false,
      manageFinance: false,
      manageSettings: false,
      manageOrganization: false,
      isOwner: false,
    },
  })
  permissions: {
    manageUsers: boolean;
    manageRoles: boolean;
    manageProjects: boolean;
    manageProducts: boolean;
    readAnalytics: boolean;
    manageFinance: boolean;
    manageSettings: boolean;
    manageOrganization: boolean;
    isOwner: boolean;
  };
}
