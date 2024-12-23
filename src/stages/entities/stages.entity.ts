import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('stages')
export class Stages extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  stageName: string;

  @Column({ nullable: true })
  stageOrder: number;

  @Column({ nullable: true })
  elimination: boolean;
}
