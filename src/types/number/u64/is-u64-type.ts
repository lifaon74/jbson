import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU64Type } from './u64-type.type';

export function isU64Type(
  value: IUnknownType,
): value is IU64Type {
  return (value.type === 'u64');
}
