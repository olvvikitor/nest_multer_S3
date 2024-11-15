import { Controller, Delete, Get, HttpStatus, Inject, Param, ParseFilePipeBuilder, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService, IFile } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('upload')
export class AppController {
  constructor(
    @Inject()
    private readonly appService: AppService,
  ) {}

  //MulterS3
  @Post('/')
  @UseInterceptors( FileInterceptor('image'))
  public async  uploadS3(@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({
    fileType: 'png',
  }).build({
    errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY, fileIsRequired: false
  }))file: Express.Multer.File){
    return await this.appService.save(file)
  }
  //delete S3
  @Delete('/:file')
  public async deleteFileS3(@Param('file') path:string){
    return await this.appService.delete(path)
  }

  @Get('/:file')
  public async getFileS3(@Param('file') path:string):Promise<IFile>{
    return await this.appService.get(path)
  }

}

