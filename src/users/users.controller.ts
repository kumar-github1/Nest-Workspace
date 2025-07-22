import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ActivateGuard } from 'src/auth/guards/activateGuard';

@Controller('users')
@UseGuards(ActivateGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.getUsers(paginationQueryDto);
  }
  @Get(':id')
  getUsersById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  // @Post()
  // postUsers(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
