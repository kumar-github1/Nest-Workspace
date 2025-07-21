import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Get(":id")
  findOne(@Param("id",ParseIntPipe) id : number ) {
      return this.tweetService.findOne(id)
  }
  @Patch()
  update(@Body() body : UpdateTweetDto){
    return this.tweetService.update(body);
  }
  @Delete(":id")
  delete(@Param("id",ParseIntPipe) id :number){
     return this.tweetService.delete(id)
  }
 
}
