import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    // @IsString()
    // @IsOptional()
    // name: string;
    // @IsString()
    // @IsEmail()
    // email: string;
    // @IsString()
    // @IsOptional()
    // password: string;
    // @IsNumber()
    // @IsOptional()
    // Age: number


    @IsString()
    @MinLength(4, { message: "The Username should contain atleast 4 characters" })
    @IsNotEmpty()
    @MaxLength(100)
    username: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    @IsNotEmpty()
    password: string;
    @IsOptional()
    profile?: CreateProfileDto | {};
}