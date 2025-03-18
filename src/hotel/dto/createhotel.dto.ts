import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  check_in: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  check_out: Date;

  @ApiProperty()
  @IsNumber()
  price: number;
}
