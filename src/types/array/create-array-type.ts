import { IUnknownType } from '../unknown/unknown-type.type';
import { IArrayType } from './array-type.type';

export function createArrayType<GType extends IUnknownType>(
  itemsType: GType,
): IArrayType<GType> {
  return {
    type: 'array',
    itemsType,
  };
}
