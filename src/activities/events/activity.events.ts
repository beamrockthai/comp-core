import { User } from 'src/users/entities';

export class ActivityLogEvent {
  static eventName = 'activity-log.create';

  actor: User;
  category: string;
  action: string;
  message: string;
  metadata?: Record<string, any>;
}
