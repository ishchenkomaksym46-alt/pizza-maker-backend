import {IsString, IsNumber} from 'class-validator';

export class CreateSlicesDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    price: string;
}

export type UpdateSlicesDto = Partial<CreateSlicesDto>;