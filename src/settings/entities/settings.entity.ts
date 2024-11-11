import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import Model from 'src/model.entity';
import { Theme } from './theme.entity';

@Entity('settings')
export class Settings extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;
  zxX;
  @Column()
  organizationType: string;

  @Column()
  imageUrl: string;

  @Column()
  billingEmail: string;

  @Column()
  organizationEmail: string;

  @Column({ nullable: true })
  descriptions: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true })
  isVat: boolean;

  @Column({ nullable: true })
  vat: number;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true }) // FIXME : change dll this to payment table
  bankName: string;

  @Column({ nullable: true })
  bankAccountName: string;

  @Column({ nullable: true })
  bankAccountNo: string;

  @Column({ nullable: true })
  bankBranch: string;

  @OneToMany(() => Theme, (theme) => theme.settings)
  theme: Theme[];

  // @OneToMany(() => Address, (address) => address.settings)
  // address: Address[];

  // @OneToMany(() => Notations, (notation) => notation.settings)
  // notations: Notations[];

  // @OneToOne(() => Organizations, (organizations) => organizations.settings)
  // @JoinColumn()
  // organization: Organizations;

  // @OneToOne(() => Branch, (branch) => branch.settings)
  // @JoinColumn()
  // branch: Branch;
}
