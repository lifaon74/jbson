import { IUnknownType } from '../../unknown/unknown-type.type';
import { II16Type } from './i16-type.type';

export function isI16Type(
  value: IUnknownType,
): value is II16Type {
  return (value.type === 'i16');
}
