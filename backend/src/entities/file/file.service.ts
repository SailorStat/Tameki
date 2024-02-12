import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createWriteStream, existsSync, mkdirSync, promises as fsPromises } from "fs";
import { assertFoundEntity } from "src/asserts/http.assert";
import { FileWriteError } from "src/exceptions/file-write-error.exception";
import { Repository } from "typeorm";

import { BaseService } from "../base/base.service";
import { FileEntity } from "./file.entity";
import { SaveFileReturnType } from "./file.types";

@Injectable()
export class FileService extends BaseService<FileEntity> {
  FileBuilder = FileEntity;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly repository: Repository<FileEntity>,
  ) {
    super(repository);
  }

  protected createEntity = (file: Express.Multer.File): FileEntity => {
    const fileEntity = new this.FileBuilder();
    const uploadsPath = this.configService.get("UPLOADS_PATH");

    if (!existsSync(uploadsPath)) {
      mkdirSync(uploadsPath, { recursive: true });
    }

    fileEntity.filename = file.originalname;

    const fileExtension = file.originalname.split(".").at(-1);

    let filePath = "";

    while (!filePath || existsSync(filePath)) {
      fileEntity.url = `${crypto.randomUUID()}.${fileExtension}`;
      filePath = `${uploadsPath}/${fileEntity.url}`;
    }

    return fileEntity;
  };

  protected writeWithRetry = async (filePath: string, file: Express.Multer.File, retryCount = 3): Promise<void> => {
    const fileStream = createWriteStream(filePath);

    fileStream.write(file.buffer, async (error) => {
      if (!error) {
        fileStream.end();

        return;
      }

      if (retryCount > 0) {
        await this.writeWithRetry(filePath, file, retryCount - 1);
      } else {
        throw new FileWriteError(file.filename);
      }
    });
  };

  save = async (file: Express.Multer.File): SaveFileReturnType => {
    const uploadsPath = this.configService.get("UPLOADS_PATH");
    const fileEntity = this.createEntity(file);
    const filePath = `${uploadsPath}/${fileEntity.url}`;

    try {
      await this.writeWithRetry(filePath, file);
    } catch (error) {
      return { errorMessage: error.message };
    }

    return this.repository.save(fileEntity);
  };

  delete = async (id: number, _: object): Promise<{ message: string }> => {
    const fileEntity = await this.repository.findOne({ where: { id } });

    assertFoundEntity(fileEntity);

    const filePath = `${this.configService.get("UPLOADS_PATH")}/${fileEntity.url}`;

    await fsPromises.unlink(filePath);
    await this.repository.softDelete(id);

    return { message: "OK" };
  };
}
