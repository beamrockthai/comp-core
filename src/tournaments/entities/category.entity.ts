import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';
import { Products } from './products.entity';
// import { Branch } from 'src/organizations/entities';

@Entity('category')
export class Category extends Model {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];

  // @ManyToOne(() => Branch, (branch) => branch.category)
  // @JoinColumn()
  // branch: Branch;

  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;
}
