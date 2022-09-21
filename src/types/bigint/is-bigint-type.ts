import { IUnknownType } from '../unknown/unknown-type.type';
import { IBigintType } from './bigint-type.type';

export function isBigintType(
  value: IUnknownType,
): value is IBigintType {
  return (value.type === 'bigint');
}
