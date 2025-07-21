import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly configService: ConfigService,
  ) {}
  // public users: User[] = [{
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

  async getUsers() {
    const environment = this.configService.get('ENV_MODE');
    console.log(environment);
    return await this.userRepository.find({
      relations: {
        // profile : true
      },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
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

    if (user)
      throw new ConflictException('The user with this email already exists');
    let newUser = this.userRepository.create(userDto);

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
}
