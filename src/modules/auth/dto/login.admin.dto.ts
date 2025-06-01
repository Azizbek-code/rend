import { IsString, IsStrongPassword } from "class-validator";

export class LoginValidatorDto {
    @IsString()
    username: string
    @IsString()
    password: string
}