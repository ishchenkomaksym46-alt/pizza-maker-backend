import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {SlicePrismaType} from "../types/types";
import {CreateSlicesDto, UpdateSlicesDto} from "../types/slices.dto";

@Injectable()
export class SlicesService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllSlices(): Promise<SlicePrismaType[]> {
        return this.prisma.slices.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                imageUrl: true,
            }
        });
    }

    async createSlice(dto: CreateSlicesDto) {
        this.prisma.slices.create({
            data: dto
        });

        return { success: true };
    }

    async updateSlice(dto: UpdateSlicesDto, id: string) {
        this.prisma.slices.update({
            where: { id },
            data: dto
        });

        return { success: true };
    }

    async deleteSlice(id: string) {
        this.prisma.slices.delete({
            where: { id },
        });

        return { success: true };
    }
}
