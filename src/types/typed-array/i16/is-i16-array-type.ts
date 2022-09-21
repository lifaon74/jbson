import { IUnknownType } from '../../unknown/unknown-type.type';
import { II16ArrayType } from './i16-array-type.type';

export function isI16ArrayType(
  value: IUnknownType,
): value is II16ArrayType {
  return (value.type === 'i16-array');
}
