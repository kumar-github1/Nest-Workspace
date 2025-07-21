import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

class TweetBaseQuery {
  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}

export type TweetQueryDto = TweetBaseQuery & PaginationQueryDto;
