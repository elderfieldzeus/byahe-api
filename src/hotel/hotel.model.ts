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
  private itinerary_id: number;

  @BelongsTo(() => Itinerary)
  private itinerary: Itinerary;

  @Column
  private name: string;

  @Column
  private location: string;

  @Column
  private check_in: Date;

  @Column
  private check_out: Date;

  @Column
  private price: number;
}
