import { default as JwtModule } from './config/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './all-exception.filter';
// import { InstallmentModule } from './installment/installment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as ormconfig from './ormconfig';
// import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { RolesModule } from './roles/roles.module';
import { SettingsModule } from './settings/settings.module';
// import { CustomersModule } from './customers/customers.module';
import { ContentsModule } from './contents/contents.module';
// import { UploadModule } from './uploads/uploads.module';
import { ProductsModule } from './tournaments/products.module';
import { AuthModule } from './auth/auth.module';
// import { AdminsModule } from './admins/admins.module';

const envFilePath =
  process.env.NODE_ENV === 'test' ? ['.env.test.local', '.env.test'] : '.env';

const modules = [
  ConfigModule.forRoot({ envFilePath }),
  EventEmitterModule.forRoot(),
  TypeOrmModule.forRoot(ormconfig.AppDataSource.options),
  JwtModule,
  UsersModule,
  SettingsModule,
  RolesModule,
  // PaymentModule,
  // InstallmentModule,
  ItemsModule,
  // CustomersModule,
  ContentsModule,
  // UploadModule,
  ProductsModule,
  AuthModule,
  // AdminsModule,
  // AddressModule,
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
