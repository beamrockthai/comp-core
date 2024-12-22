import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('teams')
export class Teams extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  nameTeam: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  description: string;
}
