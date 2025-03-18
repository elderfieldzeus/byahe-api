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
} from '@nestjs/common';
import { CreateItineraryDto } from './dto/createitinerary.dto';
import { ItineraryService } from './itinerary.service';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { UpdateItineraryDto } from './dto/updateitinerary.dto';
import { CreateFlightDto } from 'src/flight/dto/createflight.dto';
import { FlightService } from 'src/flight/flight.service';
import { HotelService } from 'src/hotel/hotel.service';
import { CreateHotelDto } from 'src/hotel/dto/createhotel.dto';

@SkipAuth()
@Controller('itinerary')
export class ItineraryController {
  constructor(
    private itineraryService: ItineraryService,
    private flightService: FlightService,
    private hotelService: HotelService,
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
    @Body() CreateHotelDto: CreateHotelDto,
  ) {
    return await this.hotelService.createHotelToItinerary(
      itinerary_id,
      CreateHotelDto,
    );
  }

  @Get('/:itinerary_id/hotel')
  async getHotels(
    @Param('itinerary_id', ParseIntPipe) itinerary_id: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.hotelService.getHotelsFromItinerary(itinerary_id, page);
  }
}
