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
    const filePath = path.join(__dirname,'..','..', '..', '..', 'uploads', file)
    const response:IFile = {
      filePath,
      fileUrl: `http://localhost:3000/uploads/${file}`
    }
    return response

  }
  async delete(file: string): Promise<void> {
    // Verifica o nome do arquivo que está sendo deletado
    console.log(file);
  
    // Define corretamente o caminho completo para o arquivo dentro do diretório 'uploads'
    const filePath = path.join(__dirname,'..','..', '..', '..', 'uploads', file)
  
    console.log(filePath);  // Imprime o caminho para garantir que está correto
  
    try {
      // Verifique se o arquivo existe
      await fs.promises.stat(filePath);
      
      // Se o arquivo existe, exclua
      await fs.promises.unlink(filePath);
      console.log(`Arquivo ${file} excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao tentar excluir o arquivo:', error);
      throw new Error('Arquivo não encontrado');
    }
  }
}