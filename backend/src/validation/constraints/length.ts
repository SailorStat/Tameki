import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

export function Length(min: number, max: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [min, max],
      name: "length",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          const [minLength, maxLength] = validationArguments.constraints;

          return createValidationMessage(
            validationArguments,
            validationOptions,
            `содержать от ${minLength} до ${maxLength} символов`,
          );
        },
        validate(value: any, validationArguments: ValidationArguments) {
          const [minLength, maxLength] = validationArguments.constraints;

          return value.length >= minLength && value.length <= maxLength;
        },
      },
    });
  };
}
