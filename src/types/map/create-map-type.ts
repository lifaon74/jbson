import { IUnknownType } from '../unknown/unknown-type.type';
import { IMapType } from './map-type.type';

export function createMapType<GKeyType extends IUnknownType, GValueType extends IUnknownType>(
  keyType: GKeyType,
  valueType: GValueType,
): IMapType<GKeyType, GValueType> {
  return {
    type: 'map',
    keyType,
    valueType,
  };
}
