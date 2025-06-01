import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Monthly price is required' })
  monthly_price: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Price must be an integer' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

}
