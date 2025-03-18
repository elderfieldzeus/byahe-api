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
} from '@nestjs/common';
import { CreateItineraryDto } from './dto/createitinerary.dto';
import { ItineraryService } from './itinerary.service';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { UpdateItineraryDto } from './dto/updateitinerary.dto';

@Controller('itinerary')
export class ItineraryController {
  constructor(private itineraryService: ItineraryService) {}

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
}
