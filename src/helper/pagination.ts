import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  limit = 10;
}

export class PaginatedOption {
  page: number;
  limit: number;

  constructor(page = 1, limit = 10) {
    this.page = page;
    this.limit = limit;
  }
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export async function pagination<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginatedOption,
): Promise<PaginatedResult<T>> {
  // Calculate the offset.
  const offset = (options.page - 1) * options.limit;

  // Setup pagination on the query builder.
  queryBuilder.skip(offset).take(options.limit);

  // Fetch paginated items and total count.
  const [items, totalItems] = await queryBuilder.getManyAndCount();

  // Calculate total pages.
  const totalPages = Math.ceil(totalItems / options.limit);

  return {
    items,
    meta: {
      totalItems,
      itemCount: items.length,
      itemsPerPage: options.limit,
      totalPages,
      currentPage: options.page,
    },
  };
}
