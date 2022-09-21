import { IUnknownType } from '../../unknown/unknown-type.type';
import { II8Type } from './i8-type.type';

export function isI8Type(
  value: IUnknownType,
): value is II8Type {
  return (value.type === 'i8');
}
