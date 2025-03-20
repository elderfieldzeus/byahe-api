import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Itinerary } from '../itinerary/itinerary.model';

@Table
export class Activity extends Model {
  @Column
  @ForeignKey(() => Itinerary)
  private itinerary_id: number;

  @BelongsTo(() => Itinerary)
  private itinerary: Itinerary;

  @Column
  private name: string;

  @Column
  private location: string;

  @Column
  private datetime: Date;

  @Column
  private price: number;
}
