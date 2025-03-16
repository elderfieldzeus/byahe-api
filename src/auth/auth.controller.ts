import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService
    ) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto); 
        }
        catch(e) {
            throw new HttpException(e.response, e.status);
        }
    }
}
