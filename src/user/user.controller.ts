import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserResponseDto } from './dto/userresponse.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query('page', ParseIntPipe) page: number) {
    const users = await this.userService.findAllUsers(page);

    const usersResponse = users.map((user) => new UserResponseDto(user));

    return usersResponse;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user: User | null = await this.userService.findById(id);

    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new UserResponseDto(user);
  }
}
