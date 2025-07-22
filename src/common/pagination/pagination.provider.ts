import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginationQueryDto } from './pagination-query.dto';
import { paginated } from './paginated.interface';
import { first, last } from 'rxjs';
import { cursorTo } from 'readline';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ): Promise<paginated<T>> {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    };
    if (where) {
      findOptions.where = where;
    }
    const totalItems = await repository.count(findOptions);
    const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
    const result = await repository.find(findOptions);
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const url = new URL(this.request.url, baseUrl);
    console.log(url);
    const response: paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems,
        totalPages,
        currentPage: paginationQueryDto.page,
      },
      links: {
        first: `${url.origin}${url.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${url.origin}${url.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
        current: `${url.origin}${url.pathname}?limit=${paginationQueryDto.limit}&page=${paginationQueryDto.page}`,
        next: `${url.origin}${url.pathname}?limit=${paginationQueryDto.limit}&page=${
          paginationQueryDto.page === totalPages
            ? totalPages
            : paginationQueryDto.page + 1
        }`,
        previous: `${url.origin}${url.pathname}?limit=${paginationQueryDto.limit}&page=${
          paginationQueryDto.page === 0
            ? paginationQueryDto.page
            : paginationQueryDto.page - 1
        }`,
      },
    };
    return response;
  }
}
