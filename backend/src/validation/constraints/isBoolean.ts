import { isBoolean, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsBoolean(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isBoolean",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(validationArguments, validationOptions, "должно быть булевым значением");
        },
        validate(value: any, _: ValidationArguments) {
          return isBoolean(value);
        },
      },
    });
  };
}
