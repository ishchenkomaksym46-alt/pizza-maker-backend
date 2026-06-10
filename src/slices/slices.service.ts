import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {SlicePrismaType} from "../types/types";
import {CreateSlicesDto, UpdateSlicesDto} from "../types/slices.dto";
import {CloudinaryService} from "../cloudinary.service";

@Injectable()
export class SlicesService {
    constructor(private readonly prisma: PrismaService,
                private readonly cloudinaryService: CloudinaryService,) {}

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

    async createSlice(dto: CreateSlicesDto, file: Express.Multer.File) {
        try {
            const uploadUrl: any = await this.cloudinaryService.uploadFile(file);

            console.log(uploadUrl.url);

            await this.prisma.slices.createMany({
                data: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    imageUrl: uploadUrl.url,
                }
            });

            return { success: true };
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e);
        }
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
