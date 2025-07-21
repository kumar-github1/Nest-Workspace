import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    text : string;


    @IsOptional()
    image : string | undefined;


    @IsInt()
    @IsNotEmpty()
    userId : number;


    @IsArray()
    @IsInt({each:true})
    hashtags: number[] ;
}
