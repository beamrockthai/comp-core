import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('ranking')
export class Ranking extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  rank: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  updatedAt: Date;
}
