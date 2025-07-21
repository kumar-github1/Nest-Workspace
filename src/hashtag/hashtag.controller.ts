import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.createHashtag(createHashtagDto);
  }

  @Get()
  findAll() {
    return this.hashtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hashtagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagService.update(+id, updateHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.hashtagService.delete(id);
  }
  @Delete("/softDelete/:id")
  softDelete(@Param("id",ParseIntPipe) id : number ){
    return this.hashtagService.softDelete(id)
  }
}
