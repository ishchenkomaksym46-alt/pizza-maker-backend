import {IsString, IsNumber} from 'class-validator';

export class CreateSlicesDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    imageUrl: string;
}

export type UpdateSlicesDto = Partial<CreateSlicesDto>;