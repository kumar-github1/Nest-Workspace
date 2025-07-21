import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./createUser.dto";


// -----instead of this we can use like this -------


export class UpdateUserDto extends PartialType(CreateUserDto){

}