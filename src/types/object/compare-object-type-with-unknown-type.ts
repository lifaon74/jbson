import { IUnknownType } from '../unknown/unknown-type.type';
import { compareObjectTypeProperties } from './compare-object-type-properties';
import { isObjectType } from './is-object-type';
import { IObjectType } from './object-type.type';

export function compareObjectTypeWithUnknownType(
  typeA: IObjectType,
  typeB: IUnknownType,
): boolean {
  return isObjectType(typeB)
    && compareObjectTypeProperties(typeA.properties, typeB.properties);
}
