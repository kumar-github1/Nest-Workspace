import { isNotEmpty, IsOptional,IsString,IsNotEmpty } from "class-validator";

export class CreateHashtagDto {
    @IsString()
    @IsNotEmpty()
    hashtag : string
}
