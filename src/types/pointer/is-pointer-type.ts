import { IUnknownType } from '../unknown/unknown-type.type';
import { IPointerType } from './pointer-type.type';

export function isPointerType(
  value: IUnknownType,
): value is IPointerType {
  return (value.type === 'pointer');
}
