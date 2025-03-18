import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Itinerary } from 'src/itinerary/itinerary.model';

@Table
export class Activity extends Model {
  @Column
  @ForeignKey(() => Itinerary)
  itinerary_id: number;

  @BelongsTo(() => Itinerary)
  itinerary: Itinerary;

  @Column
  name: string;

  @Column
  location: string;

  @Column
  datetime: Date;

  @Column
  price: number;
}
