import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Slices} from "../generated/prisma/client";

@Injectable()
export class SlicesService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllSlices(): Promise<Slices[]> {
        return this.prisma.slices.findMany();
    }
}
