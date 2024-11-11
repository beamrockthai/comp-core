import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Entities from './entities';
import * as EventListeners from './event-listeners';
import { ActivityController } from './activity.controller';
import { ActivitiesService } from './activity.service';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities))],
  providers: [ActivitiesService, ...Object.values(EventListeners)],
  controllers: [ActivityController],
  exports: [ActivitiesService],
})
export class ActivityModule {}
