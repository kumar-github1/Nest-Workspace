import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { User } from './entities/user.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Profile,Tweet])]
})
export class UsersModule { }
