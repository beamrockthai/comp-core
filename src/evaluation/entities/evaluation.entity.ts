import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('evaluation')
export class Evaluation extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  comments: string;

  @Column({ nullable: true })
  createdAt: Date;
}
