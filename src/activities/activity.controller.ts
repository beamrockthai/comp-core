import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ActivitiesService } from './activity.service';

// TODO: work in progress
@Controller('api/activities')
// @UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(private service: ActivitiesService) {}

  @Get('/')
  async getActivities(@Req() req: Request) {
    const user = req.user;

    return 'ok';

    // const ureq = await this.service.findRequestByUser(user.id);
    // const uact = await this.service.findActivityByUser(user.id);

    // return {
    //   requests: ureq,
    //   activities: uact,
    // };
  }
}
