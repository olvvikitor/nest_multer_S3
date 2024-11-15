import { IFile } from 'src/app.service';

export interface IStorageProvider{
  createMulterOptions():  any
  get(file:any):Promise<IFile>
  delete(file:string):Promise<void>
}