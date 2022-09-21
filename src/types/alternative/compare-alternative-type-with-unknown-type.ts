import { isUnionType } from '../union/is-union-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IAlternativeType } from './alternative-type.type';
import { doesAlternativeTypeContainsUnknownType } from './does-alternative-type-contains-unknown-type';
import { isAlternativeType } from './is-alternative-type';

export function compareAlternativeTypeWithUnknownType(
  typeA: IAlternativeType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return typeB.types.some((_typeB: IUnknownType): boolean => {
      return doesAlternativeTypeContainsUnknownType(typeA, _typeB);
    });
  } else if (isUnionType(typeB)) {
    return typeB.types.every((_typeB: IUnknownType): boolean => {
      return doesAlternativeTypeContainsUnknownType(typeA, _typeB);
    });
  } else {
    return doesAlternativeTypeContainsUnknownType(typeA, typeB);
  }
}
