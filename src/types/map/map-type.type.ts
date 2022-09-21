import { IUnknownType } from '../unknown/unknown-type.type';

export interface IMapType<GKeyType extends IUnknownType = IUnknownType, GValueType extends IUnknownType = IUnknownType> {
  type: 'map';
  keyType: GKeyType;
  valueType: GValueType;
}
