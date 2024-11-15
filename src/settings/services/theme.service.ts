import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeDto } from '../dtos/theme.dto';
import { Theme } from '../entities';
import { SettingsService } from './settings.service';

@Injectable()
export class ThemeService extends TypeOrmCrudService<Theme> {
  constructor(
    @InjectRepository(Theme)
    repo: Repository<Theme>,
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {
    super(repo);
  }

  // async create(settingSlug: string) {
  //   const setting = await this.settingsService.findBySlug(settingSlug);

  //   if (!setting) {
  //     throw new UnprocessableEntityException('Setting not found');
  //   }

  //   const theme = new Theme();
  //   theme.settings = setting;

  //   return await this.repo.save(theme);
  // }

  async update(dto: ThemeDto, themeSlug: string) {
    const theme = await this.repo.findOne({
      where: { slug: themeSlug },
    });

    if (!theme) {
      throw new UnprocessableEntityException('Theme not found');
    }

    theme.screen = {
      mainColor: dto.screen.mainColor,
      subColor: dto.screen.subColor,
      bgColor: dto.screen.bgColor,
      title: {
        mainColor: dto.screen.title.mainColor,
        subColor: dto.screen.title.subColor,
      },
      text: {
        mainColor: dto.screen.text.mainColor,
        subColor: dto.screen.text.subColor,
      },
    };
    theme.doc = {
      mainColor: dto.doc.mainColor,
      subColor: dto.doc.subColor,
      text: dto.doc.text,
      imageUrl: dto.doc.imageUrl,
    };

    return await this.repo.save(theme);
  }

  async findBySlug(slug: string) {
    return await this.repo.findOne({
      where: { slug: slug },
    });
  }
}
