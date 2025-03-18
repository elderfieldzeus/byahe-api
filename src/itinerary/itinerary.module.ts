import { forwardRef, Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Itinerary } from './itinerary.model';
import { UserModule } from 'src/user/user.module';
import { FlightModule } from 'src/flight/flight.module';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Itinerary]),
    forwardRef(() => UserModule),
    forwardRef(() => FlightModule),
    forwardRef(() => HotelModule),
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
