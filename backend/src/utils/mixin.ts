// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { BaseEntity } from "src/entities/base/base.entity";
import { DeleteDateColumn, getMetadataArgsStorage } from "typeorm";

type Constructor<T = object> = new (...args: any[]) => T;

export const mixin = <T extends Constructor, U extends Constructor>(
  class1: T,
  class2: U,
): Constructor<InstanceType<T> & InstanceType<U>> => {
  class CombinedClass extends BaseEntity {
    constructor(...args: any[]) {
      super(...args);
      new class1(...args);
      new class2(...args);
    }
  }

  const copyProperties = (source: any, target: any) => {
    const properties = Object.getOwnPropertyNames(source.prototype);

    for (const property of properties) {
      if (property !== "constructor") {
        const descriptor = Object.getOwnPropertyDescriptor(source.prototype, property);

        // eslint-disable-next-line no-prototype-builtins
        if (descriptor?.hasOwnProperty("value")) {
          target.prototype[property] = descriptor.value;
          // eslint-disable-next-line no-prototype-builtins
        } else if (descriptor?.hasOwnProperty("get")) {
          const columnMetadataArgs = getMetadataArgsStorage().columns.find(
            (column) => column.target === source && column.propertyName === property,
          );

          if (columnMetadataArgs) {
            Column(columnMetadataArgs.options)(target.prototype, property);
          }
          // eslint-disable-next-line no-prototype-builtins
        } else if (descriptor?.hasOwnProperty("set")) {
          const deleteDateColumnMetadataArgs = getMetadataArgsStorage().deleteDateColumns.find(
            (column) => column.target === source && column.propertyName === property,
          );

          if (deleteDateColumnMetadataArgs) {
            DeleteDateColumn(deleteDateColumnMetadataArgs.options)(target.prototype, property);
          }
        }
      }
    }
  };

  copyProperties(class1, CombinedClass);
  copyProperties(class2, CombinedClass);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return CombinedClass as unknown as Constructor<InstanceType<T> & InstanceType<U>>;
};
