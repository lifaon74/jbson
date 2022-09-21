import { IUnknownType } from '../unknown/unknown-type.type';
import { IArrayType } from './array-type.type';

export function isArrayType(
  value: IUnknownType,
): value is IArrayType {
  return (value.type === 'array');
}
