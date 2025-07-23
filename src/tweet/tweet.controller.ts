import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { TweetQueryDto } from './dto/tweet-query.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto, @ActiveUser('email') user) {
    console.log(user);
    // return this.tweetService.createTweet(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.tweetService.findOne(id, paginationQueryDto);
  }
  @Patch()
  update(@Body() body: UpdateTweetDto) {
    return this.tweetService.update(body);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.delete(id);
  }
}
