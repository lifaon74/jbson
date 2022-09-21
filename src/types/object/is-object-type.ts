import { IUnknownType } from '../unknown/unknown-type.type';
import { IObjectType } from './object-type.type';

export function isObjectType(
  value: IUnknownType,
): value is IObjectType {
  return (value.type === 'object');
}
