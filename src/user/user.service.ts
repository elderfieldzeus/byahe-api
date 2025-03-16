import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt'
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
    constructor(
        private sequelize: Sequelize,
        @InjectModel(User) private userModel: typeof User
    ) {}

    async create(user: CreateUserDto) {
        const _user = this.findByEmail(user.email);

        if (_user !== null) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        const hashPass = await bcrypt.hash(user.password, 10);

        try {
            

            await this.sequelize.transaction(async (t) => {
                await this.userModel.create({...user, password: hashPass}, {
                    transaction: t
                });
            })

            return user;
        }
        catch(e) {
            console.error(e);
            throw new HttpException(
                'User creation failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    findById(id: number) {
        return this.userModel.findOne({
            where: {
                id
            }
        });
    }

    findByEmail(email: string) {
        return this.userModel.findOne({
            where: {
                email
            }
        });
    }
}   
