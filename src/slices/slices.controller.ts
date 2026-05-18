import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import { SlicesService } from './slices.service';
import {CreateSlicesDto} from "../types/slices.dto";
import type {UpdateSlicesDto} from "../types/slices.dto";

@Controller('slices')
export class SlicesController {
  constructor(private readonly slicesService: SlicesService) {}

  @Get()
  getAllSlices() {
    return this.slicesService.getAllSlices();
  }

  @Post('create')
  createSlice(@Body() dto: CreateSlicesDto) {
    return this.slicesService.createSlice(dto);
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
