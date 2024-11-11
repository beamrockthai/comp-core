import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Entities from './entities';
import * as Services from './services';
import * as Controllers from './controllers';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    forwardRef(() => RolesModule),
  ],
  providers: [...Object.values(Services)],
  controllers: Object.values(Controllers),
  exports: [...Object.values(Services)],
})
export class UsersModule {}
