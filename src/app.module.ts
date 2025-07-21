import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from '@nestjs/config';

const env = process.env.NODE_ENV;

@Module({
  imports: [UsersModule,
    TweetModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath: !env ? `.env` : `.env.${env.trim()}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        host: "localhost",
        port: 5432,
        database: "nestjs",
        username: "postgres",
        password: "kumar...",
        type: "postgres",
        autoLoadEntities: true,
        synchronize: true
      })
    }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
