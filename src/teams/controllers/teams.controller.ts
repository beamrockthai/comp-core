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
import { TeamsService } from '../services/teams.service';
import { TeamsCreateDto, TeamsUpdateDto } from '../dtos/teams.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/teams')
export class TeamsController {
  constructor(private teamsSvc: TeamsService) {}

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
    const teams = await this.teamsSvc.findWithPagination(options, filter);

    return { success: true, ...teams };
  }
  //get
  @Post('/')
  async create(@Body() dto: TeamsCreateDto) {
    const teams = await this.teamsSvc.create(dto);

    return { success: true, data: teams };
  }

  @Get('/:teamsSlug')
  async findById(@Param('teamsSlug') teamsSlug: string) {
    const teams = await this.teamsSvc.findBySlug(teamsSlug);
    // console.log(tournaments);
    if (!teams) {
      throw new NotFoundException('not found Exception');
    }

    return teams;
  }

  @Put('/:teamsSlug')
  async update(
    @Param('teamsSlug') teamsSlug: string,
    @Body() dto: TeamsUpdateDto,
  ) {
    const teams = await this.teamsSvc.findBySlug(teamsSlug);
    if (!teams) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.teamsSvc.update(teams, dto);
    return { success: true, data: data };
  }

  @Delete('/:teamsSlug')
  async delete(@Param('teamsSlug') teamsSlug: string) {
    const teams = await this.teamsSvc.findBySlug(teamsSlug);
    if (!teams) {
      throw new UnprocessableEntityException();
    }
    await this.teamsSvc.softDelete(teams);
    return { success: true, data: teams };
  }
}
