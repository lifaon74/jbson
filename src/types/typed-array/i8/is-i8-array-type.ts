import { IUnknownType } from '../../unknown/unknown-type.type';
import { II8ArrayType } from './i8-array-type.type';

export function isI8ArrayType(
  value: IUnknownType,
): value is II8ArrayType {
  return (value.type === 'i8-array');
}
