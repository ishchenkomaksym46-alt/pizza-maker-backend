import {Controller, Get} from '@nestjs/common';
import { SlicesService } from './slices.service';

@Controller('slices')
export class SlicesController {
  constructor(private readonly slicesService: SlicesService) {}

  @Get()
  getAllSlices() {
    return this.slicesService.getAllSlices();
  }
}
