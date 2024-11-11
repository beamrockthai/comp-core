import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
// import { AuthController } from './controllers';
import { JwtStrategy } from './jwt.strategy';
import { SettingsModule } from 'src/settings/settings.module';
// import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    forwardRef(() => UsersModule),
    forwardRef(() => SettingsModule),
    // forwardRef(() => AdminsModule),
  ],
  // controllers: [AuthController],
  // providers: [AuthService, JwtStrategy],
  // exports: [AuthService],
})
export class AuthModule {}
