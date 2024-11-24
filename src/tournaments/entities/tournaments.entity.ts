import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('tournaments')
export class Tournaments extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  tourNaments: string;

  @Column({ nullable: true })
  starDate: Date;

  @Column({ nullable: true })
  MaxRounds: number;
}
