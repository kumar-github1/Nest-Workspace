import { UsersService } from './users.service';
import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe,Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(":id")
  getUsersById(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }
  @Post()
  postUsers(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
