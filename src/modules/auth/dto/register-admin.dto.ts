import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterValidatorDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(3, { message: 'Full name must be at least 3 characters' })
  @MaxLength(50, { message: 'Full name must be less than 50 characters' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(20, { message: 'Username must be less than 20 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+996\d{9}$/, {
    message: 'Phone number must be a valid kyrgyzistan number (+998xxxxxxxxx)',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(20, { message: 'Password must be less than 20 characters' })
  password: string;
}
