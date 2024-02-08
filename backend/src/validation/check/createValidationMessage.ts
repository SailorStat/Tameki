import { ValidationArguments, ValidationOptions } from "class-validator";

export const createValidationMessage = (
  { property }: ValidationArguments,
  validationOptions: ValidationOptions,
  message: string,
) => `${property} - ${validationOptions?.each ? "каждое значение в массиве " : ""}${message}`;
