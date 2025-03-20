import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { ROW_LIMIT } from '../lib/constants';
import { UserResponseDto } from './dto/userresponse.dto';
import { getOffsetFromPage } from '../lib/util';

@Injectable()
export class UserService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(user: CreateUserDto) {
    const _user = await this.findByEmail(user.email);

    if (_user !== null) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashPass = await bcrypt.hash(user.password, 10);

    try {
      const result = await this.sequelize.transaction(async (t) => {
        return await this.userModel.create(
          { ...user, password: hashPass },
          {
            transaction: t,
          },
        );
      });

      return new UserResponseDto(result);
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'User creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number) {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async findAllUsers(page: number) {
    const offset = getOffsetFromPage(page);
    return await this.userModel.findAll({
      limit: ROW_LIMIT,
      offset,
    });
  }
}
