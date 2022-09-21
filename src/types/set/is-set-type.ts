import { IUnknownType } from '../unknown/unknown-type.type';
import { ISetType } from './set-type.type';

export function isSetType(
  value: IUnknownType,
): value is ISetType {
  return (value.type === 'set');
}
