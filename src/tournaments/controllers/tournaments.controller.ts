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
import { TournamentsService } from '../services/tournaments.service';
import {
  TournamentsCreateDto,
  TournamentsUpdateDto,
} from '../dtos/tournaments.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/tournaments')
export class TournamentsController {
  constructor(private tournamentsSvc: TournamentsService) {}

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
    const tournaments = await this.tournamentsSvc.findWithPagination(
      options,
      filter,
    );

    return { success: true, ...tournaments };
  }

  // Controller to join tournament สร้างขึ้นมาใหม่
  // @Post(':tournamentsSlug/join')
  // async joinTournament(
  //   @Param('tournamentsSlug') tournamentsSlug: string,
  //   @Body('userSlug') dto: any,
  // ) {
  //   if (!dto.userSlug) {
  //     throw new BadRequestException('UserSlug is required');
  //   }
  //   return await this.tournamentsSvc.joinTournament(
  //     tournamentsSlug,
  //     dto.userSlug,
  //   );
  // }

  @Post('/')
  async create(@Body() dto: TournamentsCreateDto) {
    const tournaments = await this.tournamentsSvc.create(dto);

    return { success: true, data: tournaments };
  }

  @Get('/:tournamentsSlug')
  async findById(@Param('tournamentsSlug') tournamentsSlug: string) {
    const tournaments = await this.tournamentsSvc.findBySlug(tournamentsSlug);
    // console.log(tournaments);
    if (!tournaments) {
      throw new NotFoundException('not found Exception');
    }

    return tournaments;
  }

  @Put('/:tournamentsSlug')
  async update(
    @Param('tournamentsSlug') tournamentsSlug: string,
    @Body() dto: TournamentsUpdateDto,
  ) {
    const tournaments = await this.tournamentsSvc.findBySlug(tournamentsSlug);
    if (!tournaments) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.tournamentsSvc.update(tournaments, dto);
    return { success: true, data: data };
  }

  @Delete('/:tournamentsSlug')
  async delete(@Param('tournamentsSlug') tournamentsSlug: string) {
    const tournaments = await this.tournamentsSvc.findBySlug(tournamentsSlug);
    if (!tournaments) {
      throw new UnprocessableEntityException();
    }
    await this.tournamentsSvc.softDelete(tournaments);
    return { success: true, data: tournaments };
  }
}
