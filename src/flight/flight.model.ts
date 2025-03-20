import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Itinerary } from '../itinerary/itinerary.model';

@Table
export class Flight extends Model {
  @Column
  @ForeignKey(() => Itinerary)
  private itinerary_id: number;

  @BelongsTo(() => Itinerary)
  private itinerary: Itinerary;

  @Column
  private airline: string;

  @Column
  private flight_number: string;

  @Column
  private departure_time: Date;

  @Column
  private arrival_time: Date;

  @Column
  private price: number;
}
