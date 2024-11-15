import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/multer/multer.utils';
import { IStorageProvider } from '../domain/storage.interface.provider';
import { IFile } from 'src/app.service';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';


@Injectable()
export class Diskprovider implements MulterOptionsFactory, IStorageProvider{
  createMulterOptions():  MulterModuleOptions {
    return {
      storage: diskStorage({
        destination:'./uploads',
        filename: editFileName
      })
    }
  }
  async get(file: string): Promise<IFile> {
    const filePath = path.join(__dirname, '..', 'uploads', file);
    const response:IFile = {
      filePath,
      fileUrl: `http://localhost:3000/uploads/${filePath}`
    }
    return response

  }
  async delete(file: any): Promise<void> {
    const filePath = path.resolve(__dirname, '..', '..', 'uploads', file)
    await fs.promises.stat(filePath)
    await fs.promises.unlink(filePath)
  }
}