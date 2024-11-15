import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageProvider } from './domain/storage.interface.provider';
import { Diskprovider } from './infra/disk.provider';
import { S3StorageProvider } from './infra/S3.provider';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly diskProvider: Diskprovider,
    private readonly s3Provider: S3StorageProvider,
  ) {}

  createStorageProvider(): IStorageProvider {
    const type = this.configService.get('ENVIRONMENT');
    if (type === 'dev') {
      return this.diskProvider;
    }
    return this.s3Provider;
  }
}
