import { IsNotEmpty, IsString, Matches } from "class-validator";

export class loginWithPhone {
    @IsString()
    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^\+996\d{9}$/, {
        message: 'Phone number must be a valid kyrgyzistan number (+998xxxxxxxxx)',
    })
    phone: string;
}