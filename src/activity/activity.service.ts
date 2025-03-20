import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Activity } from './activity.model';
import { ItineraryService } from '../itinerary/itinerary.service';
import { CreateActivityDto } from './dto/createactivity.dto';
import { ROW_LIMIT } from '../lib/constants';
import { getOffsetFromPage } from '../lib/util';

@Injectable()
export class ActivityService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Activity) private activityModel: typeof Activity,
    private itineraryService: ItineraryService,
  ) {}

  async createActivityToItinerary(
    itinerary_id: number,
    createActivityDto: CreateActivityDto,
  ) {
    const itinerary = this.itineraryService.getItineraryById(itinerary_id);

    if (itinerary === null) {
      throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.sequelize.transaction(async (t) => {
        return await this.activityModel.create(
          { itinerary_id, ...createActivityDto },
          {
            transaction: t,
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Activity Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActivitiesFromItinerary(itinerary_id: number, page: number) {
    return await this.activityModel.findAll({
      where: {
        itinerary_id,
      },
      limit: ROW_LIMIT,
      offset: getOffsetFromPage(page),
    });
  }

  async updateActivityById(id: number, createActivityDto: CreateActivityDto) {
    try {
      const [affectedCount] = await this.sequelize.transaction(async (t) => {
        return await this.activityModel.update(
          { ...createActivityDto },
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

      return { id, ...createActivityDto };
    } catch (e) {
      throw new HttpException(
        'Activity Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteActivityById(id: number) {
    try {
      const deletedCount = await this.sequelize.transaction(async (t) => {
        return await this.activityModel.destroy({
          where: {
            id,
          },
          transaction: t,
        });
      });

      if (deletedCount === 0) {
        throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
      }

      return { success: true };
    } catch (e) {
      throw new HttpException(
        'Activity Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
