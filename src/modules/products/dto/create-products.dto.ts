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

  @IsInt({ message: 'Price must be an integer' })
  price: number;

}
