import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isMapType } from './is-map-type';
import { IMapType } from './map-type.type';

export function compareMapTypeWithUnknownType(
  typeA: IMapType,
  typeB: IUnknownType,
): boolean {
  return isMapType(typeB)
    && compareUnknownTypes(typeA.keyType, typeB.keyType)
    && compareUnknownTypes(typeA.valueType, typeB.valueType);
}
