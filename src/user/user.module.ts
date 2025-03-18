import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { ItineraryModule } from 'src/itinerary/itinerary.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => ItineraryModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
