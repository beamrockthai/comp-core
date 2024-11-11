import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from '../entities/content.entity';
import { ContentDto } from '../dtos/content.dto';
import { pagination, PaginatedOption } from '../../helper/pagination';

@Injectable()
export class ContentsService extends TypeOrmCrudService<Contents> {
  constructor(
    @InjectRepository(Contents)
    repo: Repository<Contents>,
  ) {
    super(repo);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findWithPagination(options: PaginatedOption, service?: string) {
    const queryBuilder = this.repo.createQueryBuilder('contents');
    queryBuilder.orderBy('contents.id', 'DESC');
    if (service) {
      queryBuilder.where('contents.service = :service', { service });
    }
    return await pagination<Contents>(queryBuilder, options);
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async findHomePreview() {
    return await this.repo.find({
      where: { service: 'features' },
      order: {
        id: 'DESC',
      },
      take: 4,
      select: ['title', 'subTitle', 'description', 'imageUrl', 'slug'],
    });
  }

  async findPreview() {
    return await this.repo.find({
      where: { service: 'features' },
      order: {
        id: 'DESC',
      },
      select: ['title', 'subTitle', 'description', 'imageUrl', 'slug'],
    });
  }

  async findPreviewById(id: number) {
    return await this.repo.findOne({
      where: { id },
      select: ['title', 'subTitle', 'description', 'imageUrl', 'slug'],
    });
  }

  async findPreviewBySlug(slug: string) {
    return await this.repo.findOne({
      where: { slug },
      select: ['title', 'subTitle', 'description', 'imageUrl', 'slug'],
    });
  }

  async findOptions() {
    return await this.repo.find({
      where: { service: 'options' },
      order: {
        id: 'DESC',
      },
      select: ['title', 'subTitle', 'description', 'imageUrl', 'slug'],
    });
  }

  async create(content: ContentDto) {
    return await this.repo.save(content);
  }

  async update(content: ContentDto) {
    return await this.repo.save(content);
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }
}
