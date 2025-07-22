import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './hashing/hashing.provider';
import { BcryptProvider } from './hashing/bcrypt.provider';
import authConfig from './config/auth.config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  imports: [forwardRef(() => UsersModule), ConfigModule.forFeature(authConfig)],
  exports: [AuthService, BcryptProvider],
})
export class AuthModule {}
