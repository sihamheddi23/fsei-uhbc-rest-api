import * as fs from 'fs'
import { BadRequestException } from "@nestjs/common";

export const onUploadFile = (prefix, id, file,dir) => {
    const UPLOAD_FILE_DIR = './uploads';
    try {
      if (!fs.existsSync(UPLOAD_FILE_DIR)) {
       fs.mkdirSync(UPLOAD_FILE_DIR, { recursive: true });
      }  
      const name = prefix + "_" + "_" + Date.now() + "_" + id;
      const nameTab = file.originalname.split(".")
      const ext = `.${nameTab[nameTab.length - 1]}`;
      const newFileName = `${name}${ext}`
      const newPath = `${UPLOAD_FILE_DIR}/${dir}/${newFileName}`;
      fs.renameSync(file.path, newPath);
          
      return newPath
    } catch (err) {
      fs.unlinkSync(file.path);
      throw new BadRequestException('Failed to upload file');
    }
}