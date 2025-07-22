import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider extends HashingProvider {
  public async hashGenerator(password: string): Promise<string> {
    //add salt to the password
    const salt = await bcrypt.genSalt();
    //hash the password
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  public async compareto(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
