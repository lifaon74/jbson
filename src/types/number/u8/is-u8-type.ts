import { IUnknownType } from '../../unknown/unknown-type.type';
import { IU8Type } from './u8-type.type';

export function isU8Type(
  value: IUnknownType,
): value is IU8Type {
  return (value.type === 'u8');
}
