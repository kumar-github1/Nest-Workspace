import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserInterface } from 'src/interfaces/activeUser.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserInterface = request.user;
    return field ? user?.[field] : user;
  },
);
