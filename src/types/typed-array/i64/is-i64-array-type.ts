import { IUnknownType } from '../../unknown/unknown-type.type';
import { II64ArrayType } from './i64-array-type.type';

export function isI64ArrayType(
  value: IUnknownType,
): value is II64ArrayType {
  return (value.type === 'i64-array');
}
