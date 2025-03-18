import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  ROW_LIMIT,
  SUPABASE_API_KEY,
  SUPABASE_BUCKET,
  SUPABASE_URL,
} from 'src/lib/constants';
import * as fs from 'fs';
import { UploadDocumentDto } from './dto/uploaddocument.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from './document.model';
import { ItineraryService } from 'src/itinerary/itinerary.service';
import { UserService } from 'src/user/user.service';
import { getOffsetFromPage } from 'src/lib/util';
import { DocumentResponseDto } from './dto/documentresponse.dto';

@Injectable()
export class DocumentService {
  private supabase: SupabaseClient;

  constructor(
    private sequelize: Sequelize,
    @InjectModel(Document) private documentModel: typeof Document,
    private itineraryService: ItineraryService,
    private userService: UserService,
  ) {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  }

  async uploadDocument(
    itinerary_id: number,
    uploadDocument: UploadDocumentDto,
    file: Express.Multer.File,
  ) {
    const itinerary =
      await this.itineraryService.getItineraryById(itinerary_id);
    const user = await this.userService.findById(uploadDocument.user_id);

    if (!itinerary || !user) {
      throw new HttpException('Invalid ID Request', HttpStatus.BAD_REQUEST);
    }

    const file_url = await this.uploadFile(file);

    try {
      return await this.sequelize.transaction(async (t) => {
        return await this.documentModel.create(
          {
            file_url,
            itinerary_id,
            ...uploadDocument,
          },
          {
            transaction: t,
          },
        );
      });
    } catch (e) {
      throw new HttpException(
        'Document Upload Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const filePath = `uploads/${file.originalname}`;

      const { data, error } = await this.supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      return data.path;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'PDF Upload Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getPublicUrl(filePath: string) {
    try {
      const { publicUrl } = this.supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(filePath).data;

      return publicUrl;
    } catch (e) {
      throw new HttpException(
        'Public URL Retrieval Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDocumentsByItineraryId(itinerary_id: number, page: number) {
    const documents = await this.documentModel.findAll({
      where: {
        itinerary_id,
      },
      limit: ROW_LIMIT,
      offset: getOffsetFromPage(page),
    });

    const documentsWithPublicUrl = documents.map(
      (doc) =>
        new DocumentResponseDto(
          doc,
          this.getPublicUrl(doc.getDataValue('file_url') as string),
        ),
    );

    return documentsWithPublicUrl;
  }

  async deleteDocumentById(id: number) {
    try {
      const deletedCount = await this.sequelize.transaction(async (t) => {
        return await this.documentModel.destroy({
          where: {
            id,
          },
          transaction: t,
        });
      });

      if (deletedCount === 0) {
        throw new HttpException('Invalid Document ID', HttpStatus.BAD_REQUEST);
      }

      return { success: true };
    } catch (e) {
      throw new HttpException(
        'Document Deletion Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
