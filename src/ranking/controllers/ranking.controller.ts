import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Put,
  UseGuards,
  UnprocessableEntityException,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RankingService } from '../services/ranking.service';
import { RankingCreateDto, RankingUpdateDto } from '../dtos/ranking.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/ranking')
export class RankingController {
  constructor(private rankingSvc: RankingService) {}

  @Get('/')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query() filter: any,
  ) {
    const options = {
      page,
      limit,
    };
    const ranking = await this.rankingSvc.findWithPagination(options, filter);

    return { success: true, ...ranking };
  }

  @Post('/')
  async create(@Body() dto: RankingCreateDto) {
    const ranking = await this.rankingSvc.create(dto);

    return { success: true, data: ranking };
  }

  @Get('/:rankingSlug')
  async findById(@Param('rankingSlug') rankingSlug: string) {
    const ranking = await this.rankingSvc.findBySlug(rankingSlug);
    // console.log(tournaments);
    if (!ranking) {
      throw new NotFoundException('not found Exception');
    }

    return ranking;
  }

  @Put('/:rankingSlug')
  async update(
    @Param('rankingSlug') rankingSlug: string,
    @Body() dto: RankingUpdateDto,
  ) {
    const ranking = await this.rankingSvc.findBySlug(rankingSlug);
    if (!ranking) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.rankingSvc.update(ranking, dto);
    return { success: true, data: data };
  }

  @Delete('/:rankingSlug')
  async delete(@Param('rankingSlug') rankingSvc: string) {
    const ranking = await this.rankingSvc.findBySlug(rankingSvc);
    if (!ranking) {
      throw new UnprocessableEntityException();
    }
    await this.rankingSvc.softDelete(ranking);
    return { success: true, data: ranking };
  }
}
