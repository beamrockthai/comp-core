import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ItemsCreateDto, ItemsUpdateDto } from '../dtos/items.dto';
import { Items } from '../entities';

@Injectable()
export class itemsService extends TypeOrmCrudService<Items> {
  constructor(
    @InjectRepository(Items)
    repo: Repository<Items>,
  ) {
    super(repo);
  }

  async findItem() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: number[]) {
    return await this.repo.find({ where: { id: In([...ids]) } });
  }

  async calculateItms(id: number) {
    const items = await this.repo.find({
      where: {
        id: id,
      },
    });

    for (const i of items) {
      i.vat = (i.price * 7) / 100;
      i.subTotal = i.price + i.vat;
      i.grandTotal = i.subTotal * i.quantity;
    }

    return await this.repo.save(items);
  }

  async create(items: ItemsCreateDto) {
    const item = await this.repo.save(items);
    const calculateItems = await this.calculateItms(item.id);
    return calculateItems;
  }

  async update(items: ItemsUpdateDto) {
    return await this.repo.save(items);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
