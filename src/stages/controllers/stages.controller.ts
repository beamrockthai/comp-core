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
import { StagesService } from '../services/stages.service';
import { StagesCreateDto, StagesUpdateDto } from '../dtos/stages.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/stages')
export class StagesController {
  constructor(private stagesSvc: StagesService) {}

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
    const stages = await this.stagesSvc.findWithPagination(options, filter);

    return { success: true, ...stages };
  }
  //get
  @Post('/')
  async create(@Body() dto: StagesCreateDto) {
    const stages = await this.stagesSvc.create(dto);
    return { success: true, data: stages };
  }

  @Get('/:stagesSlug')
  async findById(@Param('stagesSlug') stagesSlug: string) {
    const stages = await this.stagesSvc.findBySlug(stagesSlug);
    // console.log(tournaments);
    if (!stages) {
      throw new NotFoundException('not found Exception');
    }

    return stages;
  }

  @Put('/:stagesSlug')
  async update(
    @Param('stagesSlug') stagesSlug: string,
    @Body() dto: StagesUpdateDto,
  ) {
    const stages = await this.stagesSvc.findBySlug(stagesSlug);
    if (!stages) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.stagesSvc.update(stages, dto);
    return { success: true, data: data };
  }

  @Delete('/:stagesSlug')
  async delete(@Param('stagesSlug') stagesSlug: string) {
    const stages = await this.stagesSvc.findBySlug(stagesSlug);
    if (!stages) {
      throw new UnprocessableEntityException();
    }
    await this.stagesSvc.softDelete(stages);
    return { success: true, data: stages };
  }
}
