import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  SEQUELIZE_DATABASE,
  SEQUELIZE_HOST,
  SEQUELIZE_PASSWORD,
  SEQUELIZE_PORT,
  SEQUELIZE_USERNAME,
} from './lib/constants';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { FlightModule } from './flight/flight.module';
import { HotelModule } from './hotel/hotel.module';
import { ActivityModule } from './activity/activity.module';
import { DocumentModule } from './document/document.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: SEQUELIZE_HOST,
      port: SEQUELIZE_PORT,
      username: SEQUELIZE_USERNAME,
      password: SEQUELIZE_PASSWORD,
      database: SEQUELIZE_DATABASE,
      autoLoadModels: true,
    }),
    AuthModule,
    UserModule,
    ItineraryModule,
    FlightModule,
    HotelModule,
    ActivityModule,
    DocumentModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
