import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Hotel } from './hotel.model';
import { CreateHotelDto } from './dto/createhotel.dto';
import { ItineraryService } from '../itinerary/itinerary.service';
import { ROW_LIMIT } from '../lib/constants';
import { getOffsetFromPage } from '../lib/util';

@Injectable()
export class HotelService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Hotel) private hotelModel: typeof Hotel,
    private itineraryService: ItineraryService,
  ) {}

  async createHotelToItinerary(
    itinerary_id: number,
    createHotelDto: CreateHotelDto,
  ) {
    const itinerary = this.itineraryService.getItineraryById(itinerary_id);

    if (itinerary === null) {
      throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.sequelize.transaction(async (t) => {
        return await this.hotelModel.create(
          { itinerary_id, ...createHotelDto },
          {
            transaction: t,
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Hotel Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHotelsFromItinerary(itinerary_id: number, page: number) {
    return await this.hotelModel.findAll({
      where: {
        itinerary_id,
      },
      limit: ROW_LIMIT,
      offset: getOffsetFromPage(page),
    });
  }

  async updateHotelById(id: number, createHotelDto: CreateHotelDto) {
    try {
      const [affectedCount] = await this.sequelize.transaction(async (t) => {
        return await this.hotelModel.update(
          { ...createHotelDto },
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

      return { id, ...createHotelDto };
    } catch (e) {
      throw new HttpException(
        'Hotel Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteHotelById(id: number) {
    try {
      const deletedCount = await this.sequelize.transaction(async (t) => {
        return await this.hotelModel.destroy({
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
        'Hotel Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
