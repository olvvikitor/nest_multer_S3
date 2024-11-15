import { Inject, Injectable } from '@nestjs/common';
import exp from 'constants';
import { IStorageProvider } from './providers/storage/domain/storage.interface.provider';
import { ConfigService } from '@nestjs/config';

export interface IFile {
  filePath: string
  fileUrl: string
}

@Injectable()
export class AppService {
  constructor(
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,
    @Inject()
    private configService : ConfigService
  
  ) { }

  async save(file: any): Promise<IFile> {
    if(this.configService.get('ENVIRONMENT') === 'dev'){
      return {
        filePath: file.filename,
        fileUrl: `http://localhost:3000/uploads/${file.filename}`
      }
    }
    return {
      filePath: file.key,
      fileUrl: file.location,
    }
  }

  async get(file: string): Promise<IFile> {
    return await this.storageProvider.get(file)
  }
  async delete(file: string): Promise<void> {
    await this.storageProvider.delete(file)
  }
}
