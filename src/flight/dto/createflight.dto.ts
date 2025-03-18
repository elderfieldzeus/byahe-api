import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateFlightDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    airline: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    flight_number: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Transform(({value}) => new Date(value))
    departure_time: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    @Transform(({value}) => new Date(value))
    arrival_time: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number
}