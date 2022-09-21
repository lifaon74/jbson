import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU64ArrayType } from './u64-array-type.type';

export function isU64ArrayType(
  value: IUnknownType,
): value is IU64ArrayType {
  return (value.type === 'u64-array');
}
