import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { BcryptProvider } from 'src/auth/hashing/bcrypt.provider';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly configService: ConfigService,
    private readonly paginationProvider: PaginationProvider,
    private readonly bcyptProvider: BcryptProvider,
  ) {}
  // public users: User[] = [{c
  //     id: 1,
  //     name: 'John',
  //     email: 'john@gmail.com',
  //     password: '123456'
  // },
  // {
  //     id: 2,
  //     name: 'Jane',
  //     email: 'jane@gmail.com',
  //     password: '123456'
  // }];

  async getUsers(paginationQueryDto: PaginationQueryDto) {
    try {
      return this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
      );
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'Timeout cannot connect to the host.',
          'Cannot connect to the host',
        );
      }
      console.log(error);
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user)
        throw new HttpException(
          'The user is not found in the database',
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async createUser(userDto: CreateUserDto) {
    //create profile
    // userDto.profile = userDto.profile ?? {}
    // let newProfile = this.profileRepository.create(userDto.profile);
    //save profile
    // newProfile = await this.profileRepository.save(newProfile);

    // //create user object
    let user = await this.userRepository.find({
      where: {
        email: userDto.email,
      },
    });
    if (user.length > 0) {
      console.log(user);
      throw new ConflictException('The user with this email already exists');
    }
    const pass = await this.bcyptProvider.hashGenerator(userDto.password);
    let newUser = this.userRepository.create({
      ...userDto,
      password: pass,
    });

    // //set profile
    // newUser.profile = newProfile;
    //save user profile
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
  async removeUser(id: number) {
    // let user = await this.userRepository.findOneBy({id})
    await this.userRepository.delete(id);
    // if(user)
    // await this.profileRepository.delete(user.profile.id);
    return { deleted: true };
  }
  async getUserByUsername(username: string) {
    let user = await this.userRepository.findOneBy({ username });
    if (!user)
      throw new BadRequestException('the user is not found with this username');
    return user;
  }
}
