import { PartialType } from '@nestjs/mapped-types';
import { CreateTweetDto } from './create-tweet.dto';
import { IsInt } from 'class-validator';

export class UpdateTweetDto extends PartialType(CreateTweetDto) {


    @IsInt()
    id : number;
    
}
