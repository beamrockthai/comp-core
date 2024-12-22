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
import { MatchesService } from '../services/matches.service';
import { MatchesCreateDto, MatchesUpdateDto } from '../dtos/matches.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/matches')
export class MatchesController {
  constructor(private matchesSvc: MatchesService) {}

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
    const matches = await this.matchesSvc.findWithPagination(options, filter);

    return { success: true, ...matches };
  }
  //get
  @Post('/')
  async create(@Body() dto: MatchesUpdateDto) {
    const matches = await this.matchesSvc.create(dto);

    return { success: true, data: matches };
  }

  @Get('/:matchesSlug')
  async findById(@Param('matchesSlug') matchesSlug: string) {
    const matches = await this.matchesSvc.findBySlug(matchesSlug);
    // console.log(tournaments);
    if (!matches) {
      throw new NotFoundException('not found Exception');
    }

    return matches;
  }

  @Put('/:matchesSlug')
  async update(
    @Param('matchesSlug') matchesSlug: string,
    @Body() dto: MatchesUpdateDto,
  ) {
    const matches = await this.matchesSvc.findBySlug(matchesSlug);
    if (!matches) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.matchesSvc.update(matches, dto);
    return { success: true, data: data };
  }

  @Delete('/:matchesSlug')
  async delete(@Param('matchesSlug') matchesSvc: string) {
    const matches = await this.matchesSvc.findBySlug(matchesSvc);
    if (!matches) {
      throw new UnprocessableEntityException();
    }
    await this.matchesSvc.softDelete(matches);
    return { success: true, data: matches };
  }
}
