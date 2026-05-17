import { Module } from '@nestjs/common';
import { SlicesService } from './slices.service';
import { SlicesController } from './slices.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [SlicesController],
  providers: [SlicesService, PrismaService],
})
export class SlicesModule {}
