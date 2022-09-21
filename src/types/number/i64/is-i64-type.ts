import { IUnknownType } from '../../unknown/unknown-type.type';
import { II64Type } from './i64-type.type';

export function isI64Type(
  value: IUnknownType,
): value is II64Type {
  return (value.type === 'i64');
}
