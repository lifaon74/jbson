import { IUnknownType } from '../unknown/unknown-type.type';
import { IUndefinedType } from './undefined-type.type';

export function isUndefinedType(
  value: IUnknownType,
): value is IUndefinedType {
  return (value.type === 'undefined');
}
