import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signInUserDto } from 'src/user/dto/signinuser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(signInUserDto: signInUserDto): Promise<{access_token: string}> {
        const { email, password } = signInUserDto;
        
        const user = await this.userService.findByEmail(email);

        const isPasswordCorrect = await bcrypt.compare(password, user?.getDataValue('password') ?? '');

        if (user === null || !isPasswordCorrect) {
            throw new UnauthorizedException(user !== null ? "Invalid Credentials." : 'meow');
        }

        const payload = {
            sub: user.getDataValue('id'),
            username: user.getDataValue('email')
        };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
