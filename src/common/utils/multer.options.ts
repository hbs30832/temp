import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
  } catch (error) {
    console.log('the folder aleardy exists...');
  }
  try {
    console.log(`create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists`);
  }
};

const storage = (foloder: string): multer.StorageEngine => {
  createFolder(foloder);
  return multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.join(__dirname, '..', `uploads/${foloder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);

      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
