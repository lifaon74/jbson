import { IUnknownType } from '../unknown/unknown-type.type';
import { IStringType } from './string-type.type';

export function isStringType(
  value: IUnknownType,
): value is IStringType {
  return (value.type === 'string');
}
