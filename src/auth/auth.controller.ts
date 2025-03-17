import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { signInUserDto } from 'src/user/dto/signinuser.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
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

    @Post('login')
    async signin(@Body() signInUserDto: signInUserDto) {
        try {
            return await this.authService.signIn(signInUserDto);
        }
        catch(e) {
            throw new HttpException(e.response, e.status);
        }
    }
}
