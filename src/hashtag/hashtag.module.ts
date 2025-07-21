import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService],
  imports:[TypeOrmModule.forFeature([Hashtag])],
  exports:[HashtagService]
})
export class HashtagModule {}
