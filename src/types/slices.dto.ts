import {IsString, IsNumber} from 'class-validator';

export class CreateSlicesDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    image: File | null;
}

export type UpdateSlicesDto = Partial<CreateSlicesDto>;