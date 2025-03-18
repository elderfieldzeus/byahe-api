import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Itinerary } from "src/itinerary/itinerary.model";

@Table
export class Flight extends Model {
    @Column
    @ForeignKey(() => Itinerary)
    itinerary_id: number

    @BelongsTo(() => Itinerary)
    itinerary: Itinerary

    @Column
    airline: string

    @Column
    flight_number: string

    @Column
    departure_time: Date

    @Column
    arrival_time: Date

    @Column
    price: number
}