import { isDate, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isDate",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(validationArguments, validationOptions, "должно быть датой");
        },
        validate(value: any, _: ValidationArguments) {
          return isDate(value);
        },
      },
    });
  };
}
