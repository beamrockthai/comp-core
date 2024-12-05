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
import { EvaluationService } from '../services/evaluation.service';
import {
  EvaluationCreateDto,
  EvaluationUpdateDto,
} from '../dtos/evaluation.dto';

// @UseGuards(JwtAuthGuard)
@Controller('/api/crud/evaluation')
export class EvaluationController {
  constructor(private evaluationSvc: EvaluationService) {}

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
    const evaluation = await this.evaluationSvc.findWithPagination(
      options,
      filter,
    );

    return { success: true, ...evaluation };
  }
  //get
  @Post('/')
  async create(@Body() dto: EvaluationCreateDto) {
    console.log('Received DTO:', dto);
    const evaluation = await this.evaluationSvc.create(dto);

    return { success: true, data: evaluation };
  }

  @Get('/:evaluationSlug')
  async findById(@Param('evaluationSlug') evaluationSvc: string) {
    const evaluation = await this.evaluationSvc.findBySlug(evaluationSvc);
    // console.log(tournaments);
    if (!evaluation) {
      throw new NotFoundException('not found Exception');
    }

    return evaluation;
  }

  @Put('/:evaluationSlug')
  async update(
    @Param('evaluationSlug') evaluationSvc: string,
    @Body() dto: EvaluationUpdateDto,
  ) {
    const evaluation = await this.evaluationSvc.findBySlug(evaluationSvc);
    if (!evaluation) {
      throw new NotFoundException('not found Exception');
    }
    const data = await this.evaluationSvc.update(evaluation, dto);
    return { success: true, data: data };
  }

  @Delete('/:evaluationSlug')
  async delete(@Param('evaluationSlug') evaluationSvc: string) {
    const evaluation = await this.evaluationSvc.findBySlug(evaluationSvc);
    if (!evaluation) {
      throw new UnprocessableEntityException();
    }
    await this.evaluationSvc.softDelete(evaluation);
    return { success: true, data: evaluation };
  }
}
