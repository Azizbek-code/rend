import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaymentMethod } from '@prisma/client';

export class PaymentDto {

    @Transform(({ value }) => parseInt(value))
    @IsInt({ message: 'amount butun son bolishi kerak' })
    @IsNotEmpty({ message: 'amount kiritilishi shart' })
    amount: number;

    @IsEnum(PaymentMethod, { message: 'method notogri formatda' })
    @IsOptional()
    method?: PaymentMethod;

    @IsString({ message: 'description matn bolishi kerak' })
    @IsOptional()
    description?: string;
}