import { UsersService } from './../users/users.service';
import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { BcryptProvider } from './hashing/bcrypt.provider';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
    private readonly bcryptProvider: BcryptProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    //find the user by username
    let user = await this.userService.getUserByUsername(loginDto.username);
    const isMatch: boolean = await this.bcryptProvider.compareto(
      loginDto.password,
      user.password,
    );
    if (!isMatch) throw new UnauthorizedException('Unauthorized user');
    console.log(this.authConfiguration.secret);
    const jwt = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresin,
        issuer: this.authConfiguration.issuer,
        audience: this.authConfiguration.audience,
      },
    );
    return {
      token: jwt,
    };
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