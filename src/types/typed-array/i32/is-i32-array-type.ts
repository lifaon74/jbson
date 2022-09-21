import { IUnknownType } from '../../unknown/unknown-type.type';
import { II32ArrayType } from './i32-array-type.type';

export function isI32ArrayType(
  value: IUnknownType,
): value is II32ArrayType {
  return (value.type === 'i32-array');
}
