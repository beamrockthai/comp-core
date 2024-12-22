import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('matches')
export class Matches extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  scoreTeam1: number;

  @Column({ nullable: true })
  scoreTeam2: number;
}
