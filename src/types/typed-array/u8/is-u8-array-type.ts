import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU8ArrayType } from './u8-array-type.type';

export function isU8ArrayType(
  value: IUnknownType,
): value is IU8ArrayType {
  return (value.type === 'u8-array');
}
