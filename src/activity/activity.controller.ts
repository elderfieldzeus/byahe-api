import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/createactivity.dto';
import { SkipAuth } from '../auth/decorator/auth.decorator';

@SkipAuth()
@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Patch(':id')
  async updateHotel(
    @Param('id', ParseIntPipe) id: number,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return await this.activityService.updateActivityById(id, createActivityDto);
  }

  @Delete(':id')
  async deleteHotel(@Param('id', ParseIntPipe) id: number) {
    return await this.activityService.deleteActivityById(id);
  }
}
