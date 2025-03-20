import { forwardRef, Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hotel } from './hotel.model';
import { ItineraryModule } from '../itinerary/itinerary.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel]),
    forwardRef(() => ItineraryModule),
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
