import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { UploadEnum } from 'src/types/enum/upload.enum';

export class UploadDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  user_id: number;

  @ApiProperty({ enum: UploadEnum })
  @IsNotEmpty()
  @IsEnum(UploadEnum)
  type: UploadEnum;
}
