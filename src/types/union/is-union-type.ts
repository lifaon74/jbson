import { IUnknownType } from '../unknown/unknown-type.type';
import { IUnionType } from './union-type.type';

export function isUnionType(
  value: IUnknownType,
): value is IUnionType {
  return (value.type === 'union');
}
