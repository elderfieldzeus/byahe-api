import { Body, Controller, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateFlightDto } from './dto/createflight.dto';
import { FlightService } from './flight.service';
import { SkipAuth } from 'src/auth/decorator/auth.decorator';

@Controller('flight')
export class FlightController {
    constructor(
        private flightService: FlightService
    ) {}

    @Patch(':id')
    async updateFlight(@Param('id', ParseIntPipe) id: number, @Body() createFlightDto: CreateFlightDto) {
        return await this.flightService.updateFlightById(id, createFlightDto);
    }

    @Delete(':id')
    async deleteFlight(@Param('id', ParseIntPipe) id: number) {
        return await this.flightService.deleteFlightById(id);
    }
}
