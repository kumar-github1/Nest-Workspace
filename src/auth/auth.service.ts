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
import { RefreshTokenDto } from './dto/refresh-token.dto';
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
    // const jwt = await this.jwtService.signAsync(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.expiresin,
    //     issuer: this.authConfiguration.issuer,
    //     audience: this.authConfiguration.audience,
    //   },
    // );
    // // const refreshToken = await this.jwtService.signAsync(
    //   {
    //     id: user.id,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.refreshTokenExpiresIn,
    //     issuer: this.authConfiguration.issuer,
    //     audience: this.authConfiguration.audience,
    //   },
    // );
    return await this.generateToken(user);
  }

  async signUp(createUserDto: CreateUserDto) {
    const hash = await this.bcryptProvider.hashGenerator(
      createUserDto.password,
    );
    console.log(hash);
    return this.userService.createUser(createUserDto);
  }
  public async createRefreshToken(refreshTokenDto: RefreshTokenDto) {
    //1.verify the refresh token
    try {
      const { id } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshtoken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );
      //2.find the user using the user id

      const user = await this.userService.getUserById(id);
      //3.generate an access token and refresh token and send back to the user

      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        id: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }
  private async generateToken(user) {
    //generate access token
    const accessToken = await this.signToken(
      user.id,
      this.authConfiguration.expiresin,
      user.email,
    );
    //generate refersh token
    const refreshToken = await this.signToken(
      user.id,
      this.authConfiguration.refreshTokenExpiresIn,
    );
    return {
      accessToken,
      refreshToken,
    };
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
