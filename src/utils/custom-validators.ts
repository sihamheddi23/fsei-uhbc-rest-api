import { ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

export function IsArrayContains(allowedValues: any[], validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsArrayContains',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value instanceof Array && value.some((item: any) => allowedValues.includes(item));
                },
                defaultMessage(args: ValidationArguments) {
                    return `At least one of the values ${allowedValues} must be included in the array`;
                }
            }
        });
    };
}