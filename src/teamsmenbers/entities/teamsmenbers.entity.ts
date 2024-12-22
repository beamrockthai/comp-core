import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from 'src/model.entity';

@Entity('teamsmembers')
export class TeamsMembers extends Model {
  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;

  @Column()
  active: boolean;

  @Column({ nullable: true })
  memberName: string;
}
