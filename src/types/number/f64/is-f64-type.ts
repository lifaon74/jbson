import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF64Type } from './f64-type.type';

export function isF64Type(
  value: IUnknownType,
): value is IF64Type {
  return (value.type === 'f64');
}
