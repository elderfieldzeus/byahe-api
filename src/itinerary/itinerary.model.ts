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
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  start_date: Date;

  @Column
  end_date: Date;
}
