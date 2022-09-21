import { IUnknownType } from '../unknown/unknown-type.type';
import { ISetType } from './set-type.type';

export function createSetType<GType extends IUnknownType>(
  itemsType: GType,
): ISetType<GType> {
  return {
    type: 'set',
    itemsType,
  };
}
