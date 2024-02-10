import { FileEntity } from "./file.entity";

export type SaveFileReturnType<FileType extends FileEntity = FileEntity> = Promise<FileType | { errorMessage: string }>;
