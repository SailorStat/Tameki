import { isArray, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isArray",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(validationArguments, validationOptions, "должно быть массивом");
        },
        validate(value: any, _: ValidationArguments) {
          return isArray(value);
        },
      },
    });
  };
}
