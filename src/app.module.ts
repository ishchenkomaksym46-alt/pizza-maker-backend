import { Module } from '@nestjs/common';
import { SlicesModule } from './slices/slices.module';
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SlicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
