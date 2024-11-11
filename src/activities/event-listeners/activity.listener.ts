import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ActivityLogEvent } from '../events/activity.events';
import { ActivitiesService } from '../activity.service';

@Injectable()
export class ActivityLogSubscriber {
  constructor(private svc: ActivitiesService) {}

  @OnEvent(ActivityLogEvent.eventName)
  async handle(event: ActivityLogEvent) {
    await this.svc.createLog(
      event.actor,
      event.category,
      event.action,
      event.message,
      event.metadata,
    );
  }
}
