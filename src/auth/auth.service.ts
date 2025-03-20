import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from '../user/dto/signinuser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInUserDto: SignInUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signInUserDto;

    const user = await this.userService.findByEmail(email);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      (user?.getDataValue('password') as string) ?? '',
    );

    if (user === null || !isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const payload = {
      sub: user.getDataValue('id') as number,
      username: user.getDataValue('email') as string,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
