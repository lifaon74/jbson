import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { mergeUnknownTypes } from '../unknown/merge-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isObjectType } from './is-object-type';
import { IObjectType, IObjectTypeProperty } from './object-type.type';

export function mergeObjectTypeWithUnknownType(
  typeA: IObjectType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isObjectType(typeB)) {
    const hasSamePropertyKeys: boolean = (typeA.properties.length === typeB.properties.length)
      && typeA.properties.every(([keyA, valueA]: IObjectTypeProperty, index: number): boolean => {
        return (keyA === typeB.properties[index][0]);
      });

    if (hasSamePropertyKeys) {
      return {
        type: 'object',
        properties: typeA.properties.map(([keyA, valueA]: IObjectTypeProperty, index: number): IObjectTypeProperty => {
          return [
            keyA,
            mergeUnknownTypes(valueA, typeB.properties[index][1]),
          ];
        }),
      } as IObjectType as IUnknownType;
    } else {
      return createSimpleUnion(typeA, typeB);
    }
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
