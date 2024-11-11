import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AdminRole, UserRole } from './constants';

@Injectable()
export class UserRolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    console.log(request.user);
    if (!request.user) {
      return false;
    }
    const actor = request.user as any;

    switch (actor.role) {
      case AdminRole:
        return true;

      case UserRole:
        return true;

      default:
        return false;
    }
  }
}
