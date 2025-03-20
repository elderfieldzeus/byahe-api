import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flight } from './flight.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateFlightDto } from './dto/createflight.dto';
import { ItineraryService } from '../itinerary/itinerary.service';
import { getOffsetFromPage } from '../lib/util';
import { ROW_LIMIT } from '../lib/constants';

@Injectable()
export class FlightService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Flight) private flightModel: typeof Flight,
    private itineraryService: ItineraryService,
  ) {}

  async createFlightToItinerary(
    itinerary_id: number,
    createFlightDto: CreateFlightDto,
  ) {
    const itinerary =
      await this.itineraryService.getItineraryById(itinerary_id);

    if (itinerary === null) {
      throw new HttpException('Invalid Itinerary ID', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.sequelize.transaction(async (t) => {
        return this.flightModel.create(
          { ...createFlightDto, itinerary_id },
          {
            transaction: t,
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Flight Creation Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFlightsFromItinerary(itinerary_id: number, page: number) {
    return await this.flightModel.findAll({
      where: {
        itinerary_id,
      },
      limit: ROW_LIMIT,
      offset: getOffsetFromPage(page),
    });
  }

  async updateFlightById(id: number, createFlightDto: CreateFlightDto) {
    try {
      const [affectedCount] = await this.sequelize.transaction(async (t) => {
        return await this.flightModel.update(
          { ...createFlightDto },
          {
            where: {
              id,
            },
            transaction: t,
          },
        );
      });

      if (affectedCount === 0) {
        throw new HttpException('Invalid Flight ID', HttpStatus.BAD_REQUEST);
      }

      return { id, ...createFlightDto };
    } catch (e) {
      throw new HttpException(
        'Flight Update Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFlightById(id: number) {
    try {
      const deletedCount = await this.sequelize.transaction(async (t) => {
        return await this.flightModel.destroy({
          where: {
            id,
          },
          transaction: t,
        });
      });

      if (deletedCount === 0) {
        throw new HttpException('Invalid Flight ID', HttpStatus.BAD_REQUEST);
      }

      return { success: true };
    } catch (e) {
      throw new HttpException(
        'Flight Deletion Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
