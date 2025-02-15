import { default as JwtModule } from './config/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './all-exception.filter';
import * as ormconfig from './ormconfig';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { RolesModule } from './roles/roles.module';
import { SettingsModule } from './settings/settings.module';
import { ContentsModule } from './contents/contents.module';

// import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './tournaments/tornaments.module';
import { RankingModule } from './ranking/ranking.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { TeamsModule } from './teams/teams.module';
import { TeamsMembersModule } from './teamsmenbers/teamsmembers.module';
import { MatchesModule } from './matches/matches.module';
import { StagesModule } from './stages/stages.module';

const envFilePath =
  process.env.NODE_ENV === 'test' ? ['.env.test.local', '.env.test'] : '.env';

const modules = [
  ConfigModule.forRoot({ envFilePath }),

  TypeOrmModule.forRoot(ormconfig.AppDataSource.options),
  // JwtModule,
  UsersModule,
  SettingsModule,
  RolesModule,
  // ItemsModule,
  // ContentsModule,
  TournamentsModule,
  RankingModule,
  EvaluationModule,
  TeamsModule,
  TeamsMembersModule,
  MatchesModule,
  StagesModule,
  // AuthModule,
];

@Module({
  imports: modules,
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
