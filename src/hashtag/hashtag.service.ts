import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { In, Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagRepository : Repository<Hashtag>
  ){}
  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    let hashtag = this.hashtagRepository.create(createHashtagDto);
    return await this.hashtagRepository.save(hashtag)
  }
  public async findHashtags(hashtags : number[]){
    let hashtag = await this.hashtagRepository.find({
      where : {
        id : In(hashtags)
      }
    })
    return hashtag
  }
  findAll() {
    return `This action returns all hashtag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hashtag`;
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  async delete(id: number) {
    let hashtag = this.hashtagRepository.findOneBy({
      id
    })
    if(!hashtag) throw new Error("The hashtag not found")
    await this.hashtagRepository.delete(id);

    return {
      delete : true,
      id : id
    }
  }
  async softDelete(id : number){
    await this.hashtagRepository.softDelete(id);
    return {
      deleted : true, 
      id
    }
  }
}
