import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AdminRole, CustomerRole, UserRole } from './constants';
import { UserCRUDService } from 'src/users/services';
import dayjs from 'dayjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private user: UserCRUDService, configService: ConfigService) {
    const secret = configService.get('APP_JWT_SIGN_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const user = await this.user.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // if (payload.role === AdminRole) {
    //   const admin = await this.user.findById(payload.sub);

    //   if (!admin) {
    //     throw new UnauthorizedException();
    //   }
    //   admin['role'] = AdminRole;

    //   return admin;
    // }

    // if (payload.role === UserRole) {
    //   const user = await this.user.findById(payload.sub);

    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }

    //   // if (user.dueDate && dayjs().isAfter(user.dueDate)) {
    //   //   throw new ForbiddenException('user duedate exceed');
    //   // }

    //   user['role'] = UserRole;

    //   return user;
    // }

    // if (payload.role === CustomerRole) {
    //   const user = await this.user.findById(payload.sub);

    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }

    //   // if (user.dueDate && dayjs().isAfter(user.dueDate)) {
    //   //   throw new ForbiddenException('user duedate exceed');
    //   // }

    //   user['role'] = CustomerRole;

    //   return user;
    // }
  }
}
