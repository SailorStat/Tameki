import { isUUID, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsUUID(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isUUID",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(validationArguments, validationOptions, "должно быть UUID");
        },
        validate(value: any, _: ValidationArguments) {
          return isUUID(value);
        },
      },
    });
  };
}
