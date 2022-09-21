import { IUnknownType } from '../../unknown/unknown-type.type';
import { II32Type } from './i32-type.type';

export function isI32Type(
  value: IUnknownType,
): value is II32Type {
  return (value.type === 'i32');
}
