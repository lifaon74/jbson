import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF32ArrayType } from './f32-array-type.type';

export function isF32ArrayType(
  value: IUnknownType,
): value is IF32ArrayType {
  return (value.type === 'f32-array');
}
