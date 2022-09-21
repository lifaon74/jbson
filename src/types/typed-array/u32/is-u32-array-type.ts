import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU32ArrayType } from './u32-array-type.type';

export function isU32ArrayType(
  value: IUnknownType,
): value is IU32ArrayType {
  return (value.type === 'u32-array');
}
