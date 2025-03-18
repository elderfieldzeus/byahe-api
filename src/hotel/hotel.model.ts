import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Itinerary } from 'src/itinerary/itinerary.model';

@Table
export class Hotel extends Model {
  @ForeignKey(() => Itinerary)
  @Column
  itinerary_id: number;

  @BelongsTo(() => Itinerary)
  itinerary: Itinerary;

  @Column
  name: string;

  @Column
  location: string;

  @Column
  check_in: Date;

  @Column
  check_out: Date;

  @Column
  price: number;
}
