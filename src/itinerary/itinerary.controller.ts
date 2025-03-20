import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItineraryDto } from './dto/createitinerary.dto';
import { ItineraryService } from './itinerary.service';
import { SkipAuth } from '../auth/decorator/auth.decorator';
import { UpdateItineraryDto } from './dto/updateitinerary.dto';
import { CreateFlightDto } from '../flight/dto/createflight.dto';
import { FlightService } from '../flight/flight.service';
import { HotelService } from '../hotel/hotel.service';
import { CreateHotelDto } from '../hotel/dto/createhotel.dto';
import { ActivityService } from '../activity/activity.service';
import { CreateActivityDto } from '../activity/dto/createactivity.dto';
import { DocumentService } from '../document/document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDocumentDto } from '../document/dto/uploaddocument.dto';

@SkipAuth()
@Controller('itinerary')
export class ItineraryController {
  constructor(
    private itineraryService: ItineraryService,
    private flightService: FlightService,
    private hotelService: HotelService,
    private activityService: ActivityService,
    private documentService: DocumentService,
  ) {}

  @Post()
  async createItinerary(@Body() createItineraryDto: CreateItineraryDto) {
    return await this.itineraryService.create(createItineraryDto);
  }

  @Get(':id')
  async getItinerary(@Param('id', ParseIntPipe) id: number) {
    const itinerary = await this.itineraryService.getItineraryById(id);

    if (itinerary === null) {
      throw new HttpException('Itinerary not found', HttpStatus.NOT_FOUND);
    }

    return itinerary;
  }

  @Patch(':id')
  async updateItinerary(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItinerary: UpdateItineraryDto,
  ) {
    return await this.itineraryService.updateItinerary(id, updateItinerary);
  }

  @Delete(':id')
  async deleteItinerary(@Param('id', ParseIntPipe) id: number) {
    return await this.itineraryService.deleteItineraryById(id);
  }

  @Post('/:itinerary_id/flight')
  async createFlight(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Body() createFlightDto: CreateFlightDto,
  ) {
    return await this.flightService.createFlightToItinerary(
      itinerary_id,
      createFlightDto,
    );
  }

  @Get('/:itinerary_id/flight')
  async getFlights(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.flightService.getFlightsFromItinerary(itinerary_id, page);
  }

  @Post('/:itinerary_id/hotel')
  async createHotel(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Body() createHotelDto: CreateHotelDto,
  ) {
    return await this.hotelService.createHotelToItinerary(
      itinerary_id,
      createHotelDto,
    );
  }

  @Get('/:itinerary_id/hotel')
  async getHotels(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.hotelService.getHotelsFromItinerary(itinerary_id, page);
  }

  @Post('/:itinerary_id/activity')
  async createActivity(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return await this.activityService.createActivityToItinerary(
      itinerary_id,
      createActivityDto,
    );
  }

  @Get('/:itinerary_id/activity')
  async getActivities(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.activityService.getActivitiesFromItinerary(
      itinerary_id,
      page,
    );
  }

  @Post('/:itinerary_id/document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile('file') file: Express.Multer.File,
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Body() uploadDocumentDto: UploadDocumentDto,
  ) {
    return await this.documentService.uploadDocument(
      itinerary_id,
      uploadDocumentDto,
      file,
    );
  }

  @Get('/:itinerary_id/document')
  async getDocuments(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.documentService.getDocumentsByItineraryId(
      itinerary_id,
      page,
    );
  }
}
