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
import { TeamsMembersService } from '../services/teamsmenbers.service';
import {
  TeamsMembersCreateDto,
  TeamsMembersUpdateDto,
} from '../dtos/teamsmenbers.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/teamsmembers')
export class TeamsMembersController {
  constructor(private teamsmembersSvc: TeamsMembersService) {}

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
    const teams = await this.teamsmembersSvc.findWithPagination(
      options,
      filter,
    );

    return { success: true, ...teams };
  }
  //get
  @Post('/')
  async create(@Body() dto: TeamsMembersCreateDto) {
    const teamsmembers = await this.teamsmembersSvc.create(dto);

    return { success: true, data: teamsmembers };
  }

  @Get('/:teamsmembersSlug')
  async findById(@Param('teamsmembersSlug') teamsmembersSlug: string) {
    const teamsmembers = await this.teamsmembersSvc.findBySlug(
      teamsmembersSlug,
    );
    // console.log(tournaments);
    if (!teamsmembers) {
      throw new NotFoundException('not found Exception');
    }

    return teamsmembers;
  }

  @Put('/:teamsmembersSlug')
  async update(
    @Param('teamsmembersSlug') teamsmembersSlug: string,
    @Body() dto: TeamsMembersUpdateDto,
  ) {
    const teamsmembers = await this.teamsmembersSvc.findBySlug(
      teamsmembersSlug,
    );
    if (!teamsmembers) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.teamsmembersSvc.update(teamsmembers, dto);
    return { success: true, data: data };
  }

  @Delete('/:teamsmembersSlug')
  async delete(@Param('teamsmembersSlug') teamsmembersSlug: string) {
    const teamsmembers = await this.teamsmembersSvc.findBySlug(
      teamsmembersSlug,
    );
    if (!teamsmembers) {
      throw new UnprocessableEntityException();
    }
    await this.teamsmembersSvc.softDelete(teamsmembers);
    return { success: true, data: teamsmembers };
  }
}
