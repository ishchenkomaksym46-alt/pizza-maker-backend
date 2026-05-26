import { Module } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginController } from './admin-login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
})
export class AdminLoginModule {}
