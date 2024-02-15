import { isEnum, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function IsEnum(enumType, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: "isEnum",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          return createValidationMessage(
            validationArguments,
            validationOptions,
            `должно быть одним из значений enum ${enumType}`,
          );
        },
        validate(value: any, _: ValidationArguments) {
          return isEnum(value, enumType);
        },
      },
    });
  };
}
