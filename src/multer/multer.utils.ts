import * as mime from 'mime-types';

import { extname } from 'path';


export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
export const getType = (req, file, callback)=>{
  const mimeType = mime.lookup(file.originalname)
  callback(null,mimeType)
}


