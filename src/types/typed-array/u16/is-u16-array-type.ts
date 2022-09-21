import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU16ArrayType } from './u16-array-type.type';

export function isU16ArrayType(
  value: IUnknownType,
): value is IU16ArrayType {
  return (value.type === 'u16-array');
}
