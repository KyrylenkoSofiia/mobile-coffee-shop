import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';

@Controller('files')
export class FilesController {
  @Post('upload/:folderName')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folderName') folderName: string,
  ) {
    if (!file) {
      throw new Error('No file uploaded.');
    }

    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`output/${folderName}/${file.originalname}`);
    await fileRef.save(file.buffer);

    const fileLink = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2100',
    });
    return { link: fileLink[0] };
  }
}
