import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities';

import { ActivityLog } from './entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ActivityLogEvent } from './events/activity.events';

export type ActivityActor = User;

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivityLog) private repo: Repository<ActivityLog>,
    private eventEmitter: EventEmitter2,
  ) {}

  createEvent(
    actor: ActivityActor,
    category: string,
    action: string,
    message: string,
    metadata?: Record<string, any>,
  ) {
    const event = new ActivityLogEvent();
    event.category = category;
    event.action = action;
    event.actor = actor;
    event.message = message;
    event.metadata = metadata;

    this.eventEmitter.emit(ActivityLogEvent.eventName, event);
  }

  async createLog(
    actor: ActivityActor,
    category: string,
    action: string,
    message: string,
    metadata?: Record<string, any>,
  ) {
    const log = new ActivityLog();
    // log.category = category;
    log.action = action;
    log.message = message;
    // log.metadata = metadata || {};

    log.userId = actor.id;

    return await this.repo.save(log);
  }
}
