import { forwardRef, Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './document.model';
import { ItineraryModule } from '../itinerary/itinerary.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Document]),
    forwardRef(() => ItineraryModule),
    forwardRef(() => UserModule),
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
