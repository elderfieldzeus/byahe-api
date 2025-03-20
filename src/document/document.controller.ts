import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { SkipAuth } from '../auth/decorator/auth.decorator';
import { DocumentService } from './document.service';

@SkipAuth()
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Delete(':id')
  async deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return await this.documentService.deleteDocumentById(id);
  }
}
