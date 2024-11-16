import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { editFileName, getType } from 'src/multer/multer.utils';
import { IStorageProvider } from '../domain/storage.interface.provider';

@Injectable()
export class S3StorageProvider implements MulterOptionsFactory, IStorageProvider {

  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: 'us-east-1'
    })
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        s3: this.s3, 
        contentDisposition: 'inline',
        contentType: getType,
        bucket: 'pratica-multer-s3',
        acl: 'public-read',
        key: editFileName
      }),
    };
  }

  async get(key: any): Promise<any> {
    return `https://pratica-multer-s3.s3.us-east-1.amazonaws.com/${key}`
  }
  async delete(file: any): Promise<void> {
    await this.s3.deleteObject({
      Bucket: 'pratica-multer-s3',
      Key: file
    })
  }

}
