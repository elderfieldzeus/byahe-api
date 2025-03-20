import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Itinerary } from './itinerary.model';
import { CreateItineraryDto } from './dto/createitinerary.dto';
import { UserService } from '../user/user.service';
import { ROW_LIMIT } from '../lib/constants';
import { getOffsetFromPage } from '../lib/util';
import { UpdateItineraryDto } from './dto/updateitinerary.dto';

@Injectable()
export class ItineraryService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Itinerary) private itineraryModel: typeof Itinerary,
    private userService: UserService,
  ) {}

  async create(createItineraryDto: CreateItineraryDto) {
    const user = await this.userService.findById(createItineraryDto.user_id);

    if (user === null) {
      throw new HttpException('Invalid User ID', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.sequelize.transaction(async (t) => {
        return await this.itineraryModel.create(
          { ...createItineraryDto },
          {
            transaction: t,
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Itinerary Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getItineraryByUserId(user_id: number, page: number) {
    return await this.itineraryModel.findAll({
      where: {
        user_id,
      },
      limit: ROW_LIMIT,
      offset: getOffsetFromPage(page),
    });
  }

  async getItineraryById(id: number) {
    return await this.itineraryModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateItinerary(id: number, updateItineraryDto: UpdateItineraryDto) {
    try {
      const [affectedCount] = await this.sequelize.transaction(async (t) => {
        return await this.itineraryModel.update(
          { ...updateItineraryDto },
          {
            where: {
              id,
            },
            transaction: t,
          },
        );
      });

      if (affectedCount === 0) {
        throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
      }

      return { id, ...updateItineraryDto };
    } catch (e) {
      throw new HttpException(
        'Itinerary Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteItineraryById(id: number) {
    try {
      const destroyedCount = await this.sequelize.transaction(async (t) => {
        return await this.itineraryModel.destroy({
          where: {
            id,
          },
          transaction: t,
        });
      });

      if (destroyedCount === 0) {
        throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
      }

      return { success: true };
    } catch (e) {
      throw new HttpException(
        'Itinerary Deletion Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
