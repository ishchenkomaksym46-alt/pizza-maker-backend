import { Module } from '@nestjs/common';
import { SlicesModule } from './slices/slices.module';
import {ConfigModule} from "@nestjs/config";
import { AuthorizationModule } from './authorization/authorization.module';
import { AdminLoginModule } from './admin-login/admin-login.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SlicesModule, AuthorizationModule, AdminLoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
