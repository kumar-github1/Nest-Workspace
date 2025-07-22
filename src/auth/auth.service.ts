import { UsersService } from './../users/users.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { BcryptProvider } from './hashing/bcrypt.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
    private readonly bcryptProvider: BcryptProvider,
  ) {}
  public isAuth: boolean = false;
  authenticate(mail: string, pwd: string) {
    console.log(this.authConfiguration);
  }

  async signUp(createUserDto: CreateUserDto) {
    const hash = await this.bcryptProvider.hashGenerator(
      createUserDto.password,
    );
    console.log(hash);
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
