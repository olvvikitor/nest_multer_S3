import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './providers/storage/storage.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StorageModule
  ],

  controllers: [AppController],

  providers: [AppService],

  exports: [AppService]

})
export class AppModule { }
