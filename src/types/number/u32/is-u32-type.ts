import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU32Type } from './u32-type.type';

export function isU32Type(
  value: IUnknownType,
): value is IU32Type {
  return (value.type === 'u32');
}
