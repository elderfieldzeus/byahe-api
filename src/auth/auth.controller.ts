import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { SignInUserDto } from 'src/user/dto/signinuser.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorator/auth.decorator';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return await this.authService.signIn(signInUserDto);
  }
}
