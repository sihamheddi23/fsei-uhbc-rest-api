import { diskStorage } from "multer";

export const onUploadFile = (directory, prefix) => ({
      storage: diskStorage({
            destination: `./uploads/${directory}`,
          filename: (req, file, cb) => {
                // random number unique
                const originalName = prefix + "_" + "_" + Date.now() + "_" + Math.random() * 1e9;
                const nameTab = file.originalname.split(".")
                const ext = `.${nameTab[nameTab.length - 1]}`;
                const filename = `${originalName}${ext}`
                cb(null, filename)
            }
        })
})