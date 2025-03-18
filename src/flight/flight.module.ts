import { forwardRef, Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flight } from './flight.model';
import { ItineraryModule } from 'src/itinerary/itinerary.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Flight]),
    forwardRef(() => ItineraryModule),
  ],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
