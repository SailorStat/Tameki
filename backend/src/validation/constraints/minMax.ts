import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

import { createValidationMessage } from "./createValidationMessage";

interface MinMaxOptions {
  max?: number;
  min?: number;
}

const messages = {
  max: (max: number) => `меньше или равно ${max}`,
  min: (min: number) => `больше или равно ${min}`,
  minMax: (min: number, max: number) => `больше или равно ${min} и меньше или равно ${max}`,
} as const;

export function MinMax({ min, max }: MinMaxOptions, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [min, max],
      name: "minMax",
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(validationArguments: ValidationArguments) {
          const [min, max] = validationArguments.constraints;

          const message =
            min === undefined ? messages.max(max) : max === undefined ? messages.min(min) : messages.minMax(min, max);

          return createValidationMessage(validationArguments, validationOptions, `должно быть ${message}`);
        },
        validate(value: any, { constraints }: ValidationArguments) {
          const [min, max] = constraints;

          return !(value < min || max < value);
        },
      },
    });
  };
}
