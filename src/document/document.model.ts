import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Itinerary } from 'src/itinerary/itinerary.model';
import { UploadEnum } from 'src/types/enum/upload.enum';
import { User } from 'src/user/user.model';

@Table
export class Document extends Model {
  @Column
  @ForeignKey(() => Itinerary)
  private itinerary_id: number;

  @BelongsTo(() => Itinerary)
  private itinerary: Itinerary;

  @Column
  @ForeignKey(() => User)
  private user_id: number;

  @BelongsTo(() => User)
  private user: User;

  @Column
  private type: UploadEnum;

  @Column
  private file_url: string;

  @Default(new Date())
  @Column
  private upload_date: Date;
}
