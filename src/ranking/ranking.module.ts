import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Entities from './entities';
import * as Services from './services';
import * as Controllers from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities))],
  providers: [...Object.values(Services)],
  controllers: Object.values(Controllers),
  exports: [...Object.values(Services)],
})
export class RankingModule {}
