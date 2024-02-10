import { HttpException, HttpStatus } from "@nestjs/common";

export class FileWriteError extends HttpException {
  constructor(filename: string) {
    super(`Ошибка записи файла: ${filename}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
