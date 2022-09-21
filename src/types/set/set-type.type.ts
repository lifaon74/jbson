import { IUnknownType } from '../unknown/unknown-type.type';

export interface ISetType<GType extends IUnknownType = IUnknownType> {
  type: 'set';
  itemsType: GType;
}
