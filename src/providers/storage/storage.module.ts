import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { StorageFactory } from './storage.factory';
import { Diskprovider } from './infra/disk.provider';
import { S3StorageProvider } from './infra/S3.provider';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService, diskProvider: Diskprovider, s3StorageProvider: S3StorageProvider) => {
        return new StorageFactory(configService, diskProvider, s3StorageProvider).createStorageProvider().createMulterOptions()
      },
      inject: [ConfigService, Diskprovider, S3StorageProvider]
    }),
  ],
  providers: [
    Diskprovider,
    S3StorageProvider,
    {
      provide: 'IStorageProvider', useFactory: async (configService: ConfigService, diskProvider: Diskprovider, s3StorageProvider: S3StorageProvider) => {
        return new StorageFactory(configService, diskProvider, s3StorageProvider).createStorageProvider()
      },
      inject: [ConfigService, Diskprovider, S3StorageProvider]
    }
  ],
  exports:['IStorageProvider', Diskprovider, S3StorageProvider, MulterModule]
})
export class StorageModule { }