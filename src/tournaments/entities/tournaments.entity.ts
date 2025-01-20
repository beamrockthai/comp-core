import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';
import { User } from 'src/users/entities';

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
  endDate: Date;

  @Column({ nullable: true })
  MaxRounds: number;

  //Relation Ship Entity
  @ManyToOne(() => User, (user) => user.tournaments)
  @JoinColumn()
  user: User;
}
