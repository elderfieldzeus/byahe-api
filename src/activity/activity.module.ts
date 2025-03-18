import { forwardRef, Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Activity } from './activity.model';
import { ItineraryModule } from 'src/itinerary/itinerary.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Activity]),
    forwardRef(() => ItineraryModule),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
