import { Column, Entity } from 'typeorm';
import Model from 'src/model.entity';

@Entity('contents')
export class Contents extends Model {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  service: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: true })
  imageName: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  username: string;

  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;
}
