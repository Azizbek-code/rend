import { Transform } from 'class-transformer';
import {
    IsNumber,
    IsDateString,
    IsNotEmpty,
    IsUUID,
    IsEnum,
    IsString,
} from 'class-validator';
import { Status } from '@prisma/client';


export class CreateRent {
    @Transform(({ value }) => parseFloat(value))
    @IsNumber({}, { message: 'amount must be a number' })
    @IsNotEmpty({ message: 'amount is required' })
    amount: number;

    @IsDateString({}, { message: 'end_time must be a valid ISO date string' })
    @IsNotEmpty()
    end_time: string;

    @IsDateString({}, { message: 'monthly_payment must be a valid ISO date string' })
    @IsNotEmpty()
    monthly_payment: string;

    @IsEnum(Status)
    @IsString()
    status: Status

    @IsString()
    remaining_amount: string
}
