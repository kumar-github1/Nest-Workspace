import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/users/entities/user.entitiy';
import { HashtagModule } from 'src/hashtag/hashtag.module';
@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports:[UsersModule,TypeOrmModule.forFeature([Tweet,User]),HashtagModule]
})
export class TweetModule {}
