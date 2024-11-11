import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from 'src/model.entity';
import { Category } from './category.entity';
// import { Branch } from 'src/organizations/entities';

@Entity('products')
export class Products extends Model {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  subTotal: number;

  @Column({ nullable: false, default: false })
  isVat: boolean;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // @ManyToOne(() => Branch, (branch) => branch.products)
  // @JoinColumn()
  // branch: Branch;

  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;
}
