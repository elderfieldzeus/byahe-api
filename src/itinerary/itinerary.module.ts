import { forwardRef, Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Itinerary } from './itinerary.model';
import { UserModule } from '../user/user.module';
import { FlightModule } from '../flight/flight.module';
import { HotelModule } from '../hotel/hotel.module';
import { ActivityModule } from '../activity/activity.module';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Itinerary]),
    forwardRef(() => UserModule),
    forwardRef(() => FlightModule),
    forwardRef(() => HotelModule),
    forwardRef(() => ActivityModule),
    forwardRef(() => DocumentModule),
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
