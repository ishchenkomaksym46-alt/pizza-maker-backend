import { Module } from '@nestjs/common';
import { SlicesModule } from './slices/slices.module';
import {ConfigModule} from "@nestjs/config";
import { AdminLoginModule } from './admin-login/admin-login.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SlicesModule, AuthModule, AdminLoginModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
