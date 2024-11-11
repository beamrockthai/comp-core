import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from 'src/model.entity';
import { Settings } from './settings.entity';

@Entity('theme_settings')
export class Theme extends Model {
  @Column()
  settingsId: number;

  @ManyToOne(() => Settings)
  @JoinColumn()
  settings: Settings;

  @Column('jsonb', {
    nullable: false,
    default: {
      mainColor: '#000000',
      subColor: '#000000',
      bgColor: '#000000',
      title: {
        mainColor: '#000000',
        subColor: '#000000',
      },
      text: {
        mainColor: '#000000',
        subColor: '#000000',
      },
    },
  })
  screen: object;

  @Column('jsonb', {
    nullable: false,
    default: {
      mainColor: '#000000',
      subColor: '#000000',
      text: '#000000',
      imageUrl: '',
    },
  })
  doc: object;

  @Column({ default: () => 'uuid_generate_v4()' })
  slug: string;
}
