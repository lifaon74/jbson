import { IUnknownType } from '../unknown/unknown-type.type';
import { IBooleanType } from './boolean-type.type';

export function isBooleanType(
  value: IUnknownType,
): value is IBooleanType {
  return (value.type === 'boolean');
}
