import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get()
    async getAllUsers(@Query('page', ParseIntPipe) page: number) {
        return await this.userService.findAllUsers(page);
    }
}
