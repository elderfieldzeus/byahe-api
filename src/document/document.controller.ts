import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { SkipAuth } from '../auth/decorator/auth.decorator';
import { DocumentService } from './document.service';
import { DOCUMENT_DIRECTORY } from 'src/lib/constants';
import { join } from 'path';
import { existsSync } from 'node:fs';
import { Response } from 'express';

@SkipAuth()
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  // @Delete(':id')
  // async deleteDocument(@Param('id', ParseIntPipe) id: number) {
  //   return await this.documentService.deleteDocumentByIdSupabase(id);
  // }

  @Get(':id')
  async getImage(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const document = await this.documentService.getDocumentById(id);

    if (document === null) {
      throw new HttpException('Invalid ID Request', HttpStatus.BAD_REQUEST);
    }

    const file_url = document.getDataValue('file_url') as string;

    console.log('\n\n' + file_url + '\n\n');

    const filePath = join(__dirname, '..', '..', DOCUMENT_DIRECTORY, file_url);

    console.log('\n\n' + filePath + '\n\n');

    // Check if file exists
    if (!existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.sendFile(filePath);
  }
}
