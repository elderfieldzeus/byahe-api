import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Itinerary extends Model {
  @Column
  @ForeignKey(() => User)
  private user_id: number;

  @BelongsTo(() => User)
  private user: User;

  @Column
  private title: string;

  @Column
  private description: string;

  @Column
  private start_date: Date;

  @Column
  private end_date: Date;
}
