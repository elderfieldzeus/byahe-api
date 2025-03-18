import { Itinerary } from 'src/itinerary/itinerary.model';
import { UploadEnum } from 'src/types/enum/upload.enum';
import { User } from 'src/user/user.model';
import { Document } from '../document.model';

export class DocumentResponseDto {
  private itinerary_id: number;
  private user_id: number;
  private type: UploadEnum;
  private file_url: string;
  private upload_date: Date;

  constructor(document: Document, publicUrl: string) {
    this.itinerary_id = Number(document.getDataValue('itinerary_id'));
    this.user_id = Number(document.getDataValue('user_id'));
    this.type = document.getDataValue('type') as UploadEnum;
    this.upload_date = document.getDataValue('upload_date') as Date;

    this.file_url = publicUrl;
  }
}
