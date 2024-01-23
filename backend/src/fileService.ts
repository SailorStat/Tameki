import * as path from "path";
import { v4 } from "uuid";

class FileService {
  save = (file) => {
    try {
      const fileName = `${v4()}.jpg`;
      const filePath = path.resolve("static", fileName);

      console.log(path.resolve("static", fileName));
      file.mv(filePath);

      return fileName;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

const fileService = new FileService();

export default fileService;
