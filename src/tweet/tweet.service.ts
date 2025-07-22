import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { PaginationQueryDto } from '../common/pagination/pagination-query.dto';
import { TweetQueryDto } from './dto/tweet-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { paginated } from 'src/common/pagination/paginated.interface';
@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async createTweet(createTweetDto: CreateTweetDto) {
    let user = await this.userService.getUserById(createTweetDto.userId);
    if (!user) throw new Error('user not found');
    let hashtags = [];
    if (createTweetDto.hashtags) {
      let hashtags = await this.hashtagService.findHashtags(
        createTweetDto.hashtags,
      );
    }
    let tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });
    return await this.tweetRepository.save(tweet);
  }

  async findAll() {
    return await this.tweetRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(
    id: number,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<paginated<Tweet>> {
    // console.log(paginationQueryDto);
    let user = await this.userService.getUserById(id);
    if (!user)
      throw new NotFoundException(`The user with userId ${id} is not found`);
    return this.paginationProvider.paginateQuery(
      paginationQueryDto,
      this.tweetRepository,
      {
        user: {
          id,
        },
      },
    );
  }

  async update(updateTweetDto: UpdateTweetDto) {
    let hastags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags ?? [],
    );
    let tweet = await this.tweetRepository.findOneBy({ id: updateTweetDto.id });
    if (!tweet) {
      throw new Error('the user is not found');
    }
    tweet.text = updateTweetDto.text ?? tweet?.text;
    tweet.image = updateTweetDto.image ?? tweet.image;
    tweet.hashtags = hastags ?? [];

    return await this.tweetRepository.save(tweet);
  }

  async delete(id: number) {
    let tweet = await this.tweetRepository.findOneBy({ id });
    if (!tweet) throw new Error('tweet not found');
    await this.tweetRepository.delete(id);
    return {
      deleted: true,
      status: 'OK',
    };
  }
}
