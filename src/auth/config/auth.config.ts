import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
  secret_key: process.env.SECRET_KEY,
}));
