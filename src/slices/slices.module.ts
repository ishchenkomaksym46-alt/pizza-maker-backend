import { Module } from '@nestjs/common';
import { SlicesService } from './slices.service';
import { SlicesController } from './slices.controller';
import {PrismaService} from "../prisma.service";
import {CloudinaryService} from "../cloudinary.service";
import {CloudinaryModule} from "../cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [SlicesController],
  providers: [SlicesService, PrismaService, CloudinaryService],
})
export class SlicesModule {}
