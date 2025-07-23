import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { request } from 'http';
import { Observable } from 'rxjs';
import authConfig from '../config/auth.config';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_VALUE } from 'src/constants/constants';

export class ActivateGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    //extract request from the execution context
    const request: Request = context.switchToHttp().getRequest();

    //extract token from the request header

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
      );
      request[REQUEST_USER_VALUE] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
