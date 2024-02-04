import { isString, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isString",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(validationArguments, validationOptions, "должно быть строкой");
        },
        validate(value: any, args: ValidationArguments) {
          return isString(value);
        },
      },
    });
  };
}
