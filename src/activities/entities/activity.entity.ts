import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities';
import Model from 'src/model.entity';

@Entity('activity_logs')
@Index(['event', 'eventType', 'userId'])
export class ActivityLog extends Model {
  @Column()
  event: string;

  @Column() // type of event to save
  eventType: string;

  @Column({ nullable: true }) // have action created | updated | deleted | canceled
  action: string;

  @Column({ nullable: true })
  message: string;

  @Column({ type: 'jsonb', default: '{}' })
  data: any;

  @Column({ type: 'jsonb', default: '{}' })
  reference: any;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
