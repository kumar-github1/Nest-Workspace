import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Profile, Tweet]),
    PaginationModule,
    AuthModule,
  ],
})
export class UsersModule {}
