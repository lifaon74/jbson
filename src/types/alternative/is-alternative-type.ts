import { IUnknownType } from '../unknown/unknown-type.type';
import { IAlternativeType } from './alternative-type.type';

export function isAlternativeType(
  value: IUnknownType,
): value is IAlternativeType {
  return (value.type === 'alternative');
}
