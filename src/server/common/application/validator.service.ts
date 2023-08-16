/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { Schema} from 'joi';

export function validate<T>(value: object, schema: Schema<T>, errorMsg: string): T {
  const { error, value: validatedValue } = schema.validate(value);

  if (error) {
    throw new Error(errorMsg);
  }

  return validatedValue as T;
}
