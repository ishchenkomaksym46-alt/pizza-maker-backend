import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { SlicesService } from './slices.service';
import {CreateSlicesDto} from "../types/slices.dto";
import type {UpdateSlicesDto} from "../types/slices.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('slices')
export class SlicesController {
  constructor(private readonly slicesService: SlicesService) {}

  @Get()
  getAllSlices() {
    return this.slicesService.getAllSlices();
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  createSlice(@Body() dto: CreateSlicesDto, @UploadedFile() file: Express.Multer.File) {
    if(!dto || !file) {
      throw new BadRequestException('Invalid data');
    }

    return this.slicesService.createSlice(dto, file);
  }

  @Put('update')
  updateSlice(@Body() dto: UpdateSlicesDto, @Query('id') id: string) {
    return this.slicesService.updateSlice(dto, id);
  }

  @Delete('delete')
  deleteSlice(@Query('id') id: string) {
    return this.slicesService.deleteSlice(id);
  }
}
