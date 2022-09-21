import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU16Type } from './u16-type.type';

export function isU16Type(
  value: IUnknownType,
): value is IU16Type {
  return (value.type === 'u16');
}
