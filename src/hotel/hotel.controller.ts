import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/createhotel.dto';

@SkipAuth()
@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Patch(':id')
  async updateHotel(
    @Param('id', ParseIntPipe) id: number,
    @Body() createHotelDto: CreateHotelDto,
  ) {
    return await this.hotelService.updateHotelById(id, createHotelDto);
  }

  @Delete(':id')
  async deleteHotel(@Param('id', ParseIntPipe) id: number) {
    return await this.hotelService.deleteHotelById(id);
  }
}
