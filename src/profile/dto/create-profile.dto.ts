import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsOptional()
    @IsString()
    firstname: string;
    @IsOptional()
    @IsString()
    lastname: string;
    @IsOptional()
    @IsString()
    gender: string;
    @IsDate()
    @IsOptional()
    dateOfBirth: Date;
    @IsString()
    @IsOptional()
    bio: string;
    @IsString()
    @IsOptional()
    profileImage: string
}
