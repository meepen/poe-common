import { Expose, plainToInstance, Transform, TransformationType, Type } from "class-transformer";
import { IsNotEmpty, isObject, registerDecorator, validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import "reflect-metadata";

interface DictionaryWrapperInterface {
  field: unknown;
}
@ValidatorConstraint({ name: 'IsDictionary', async: true })
export class IsDictionaryConstraint implements ValidatorConstraintInterface {
  private readonly validationErrors: string[] = [];

  async validate(dict: unknown, args: ValidationArguments): Promise<boolean> {
    if (!isObject(dict)) {
      return false;
    }
    const [classConstructor] = args.constraints as [new() => DictionaryWrapperInterface];

    const results = (await Promise.all(
      Object
        .entries(dict)
        .map(async ([key, value]) => 
          (await validate(plainToInstance(classConstructor, { field: value })))
            .map(err => ({
              key,
              constraints: err.constraints,
            }))
        ),
    )).flat();

    this.validationErrors.push(...results.flatMap(err => `${err.key}: ${Object.values(err.constraints || {}).join(', ')}`));

    return results.length === 0;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    if (this.validationErrors.length > 0) {
      return this.validationErrors.join(', ');
    }

    return `${String(validationArguments.property)} must be a dictionary`;
  }
}

function isArrayType<T>(cls: (new () => T) | (() => new () => T)): cls is () => new () => T {
  return !(typeof cls === 'function' && cls.prototype);
}

export function TransformDictionary<T>(cls: (new () => T) | (() => new () => T)): PropertyDecorator {
  const isArray = isArrayType(cls);
  const clsInstance = isArray ? cls() : cls;
  return Transform(({ value, type }) => {
    switch (type) {
      case TransformationType.PLAIN_TO_CLASS: {
        if (isArray) {
          const instance = plainToInstance(Dictionary<T[]>, value);
          for (const [key, value] of Object.entries(instance)) {
            instance[key] = value
              .map(innerValue => plainToInstance(clsInstance, innerValue));
          }
          return instance;
        } else {
          const instance = plainToInstance(Dictionary<T>, value);
          for (const [key, value] of Object.entries(instance)) {
            instance[key] = plainToInstance(clsInstance, value);
          }
          return instance;
        }
      }
      case TransformationType.CLASS_TO_PLAIN: {
        if (isArray) {
          const instance = plainToInstance(Dictionary<T[]>, value);
          for (const [key, value] of Object.entries(instance)) {
            instance[key] = value.map(innerValue => plainToInstance(clsInstance, innerValue));
          }
          return instance;
        }
        else {
          const instance = plainToInstance(Dictionary<T>, value);
          for (const [key, value] of Object.entries(instance)) {
            instance[key] = plainToInstance(clsInstance, value);
          }
          return instance;
        }
      }
      case TransformationType.CLASS_TO_CLASS: 
        throw new Error('TransformDictionary does not support CLASS_TO_CLASS transformation');
    }
  });
}

export function IsDictionary(
  propertyDecorators?: PropertyDecorator[],
  validationOptions?: { each?: boolean }
): PropertyDecorator {
  class DictionaryWrapper implements DictionaryWrapperInterface {
    @Expose()
    field: unknown;
  }
  
  var descriptor = Reflect.decorate(propertyDecorators?.length ? propertyDecorators : [IsNotEmpty()], DictionaryWrapper.prototype, 'field', void 0);
  if (descriptor) {
    Object.defineProperty(DictionaryWrapper.prototype, 'field', descriptor);
  }

  return (target: object, propertyName: string | symbol) => {
    if (typeof propertyName !== 'string') {
      throw new Error('IsDictionary decorator can only be used on string properties');
    }

    return registerDecorator({
      target: target.constructor,
      propertyName,
      constraints: [DictionaryWrapper],
      options: {
        ...validationOptions,
      },
      validator: IsDictionaryConstraint,
    })
  };
}

export class Dictionary<T> {
  [key: string]: T;
}
