import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF64ArrayType } from './f64-array-type.type';

export function isF64ArrayType(
  value: IUnknownType,
): value is IF64ArrayType {
  return (value.type === 'f64-array');
}
