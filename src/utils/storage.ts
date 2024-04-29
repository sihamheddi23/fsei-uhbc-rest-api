import * as fs from 'node:fs'
import { BadRequestException } from "@nestjs/common";

export const onUploadFile =  (prefix, id, file, dir, extensions) => {
    const UPLOAD_FILE_DIR = `./uploads/${dir}`;
   
    if (!fs.existsSync(UPLOAD_FILE_DIR)) {
      fs.mkdirSync(UPLOAD_FILE_DIR, { recursive: true });
    }  
    const name = prefix + "_" + Date.now() + "_" + id;
    const nameTab = file.originalname.split(".")
    
    const ext = `${nameTab[nameTab.length - 1]}`;
    const isValidExtension = extensions.includes(ext);
    if (!isValidExtension) {
      throw new BadRequestException(`file Extension must be one of ${extensions}`);
    }
    
    const newFileName = `${name}.${ext}`
    const newPath = `${UPLOAD_FILE_DIR}/${newFileName}`;
  
    try {
      fs.writeFileSync(newPath, file.buffer);
      return newPath.split("./")[1]
    } catch (err) {
      throw err;
    }
}