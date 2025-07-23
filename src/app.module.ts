import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import validator from './config/env.validator';
import { APP_GUARD } from '@nestjs/core';
import { ActivateGuard } from './auth/guards/activateGuard';
import authConfig from './auth/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
const env = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    TweetModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !env ? `.env` : `.env.${env.trim()}`,
      load: [appConfig, databaseConfig],
      validationSchema: validator,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        database: configService.get('database.dbname'),
        username: 'postgres',
        password: configService.get('database.dbpass'),
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProfileModule,
    HashtagModule,
    PaginationModule,
    ConfigModule.forFeature(authConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ActivateGuard,
    },
  ],
})
export class AppModule {}
