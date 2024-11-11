import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from 'src/model.entity';
// import { Notations } from 'src/notations/entities';

@Entity('items')
export class Items extends Model {
  length: number;
  map(i: any) {
    throw new Error('Method not implemented.');
  }

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  vat: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  subTotal: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  grandTotal: number;

  // @ManyToOne(() => Notations, (notation) => notation.items)
  // @JoinColumn()
  // notation: Notations;
}
