import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Entities from './entities';
import * as Services from './services';
import * as Controllers from './controllers';
import { TournamentsModule } from 'src/tournaments/tornaments.module';
TournamentsModule;

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    forwardRef(() => TournamentsModule), // Add forwardRef to TournamentsModule
  ],
  providers: [...Object.values(Services)],
  controllers: Object.values(Controllers),
  exports: [...Object.values(Services), TypeOrmModule], // Add TypeOrmModule to exports
})
export class UsersModule {}
