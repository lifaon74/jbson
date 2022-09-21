import { IUnknownType } from '../unknown/unknown-type.type';
import { INullType } from './null-type.type';

export function isNullType(
  value: IUnknownType,
): value is INullType {
  return (value.type === 'null');
}
