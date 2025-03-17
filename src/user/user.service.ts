import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { ROW_LIMIT } from 'src/lib/constants';

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
      await this.sequelize.transaction(async (t) => {
        console.log(
          await this.userModel.create(
            { ...user, password: hashPass },
            {
              transaction: t,
            },
          ),
        );
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
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
    const offset = ROW_LIMIT * (page - 1);
    return await this.userModel.findAll({
      limit: ROW_LIMIT,
      offset: offset < 0 ? 0 : offset,
    });
  }
}
