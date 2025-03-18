import { forwardRef, Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Itinerary } from './itinerary.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Itinerary]),
    forwardRef(() => UserModule),
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
