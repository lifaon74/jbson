import { IUnknownType } from '../unknown/unknown-type.type';

export interface IArrayType<GType extends IUnknownType = IUnknownType> {
  type: 'array';
  itemsType: GType;
}
