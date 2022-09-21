import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF32Type } from './f32-type.type';

export function isF32Type(
  value: IUnknownType,
): value is IF32Type {
  return (value.type === 'f32');
}
