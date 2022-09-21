import { IUnionTypeTypes } from '../union/union-type.type';
import { createRawUnionType } from '../union/create-raw-union-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IAlternativeType } from './alternative-type.type';
import { createAlternativeType } from './create-alternative-type';
import { doesAlternativeTypeContainsUnknownType } from './does-alternative-type-contains-unknown-type';
import { isAlternativeType } from './is-alternative-type';

export function mergeAlternativeTypeWithUnknownType(
  typeA: IAlternativeType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    // only common types
    const commonTypes: IUnknownType[] = typeB.types.filter((_typeB: IUnknownType): boolean => {
      return doesAlternativeTypeContainsUnknownType(typeA, _typeB);
    });

    if (commonTypes.length > 0) {
      return createAlternativeType(commonTypes);
    } else {
      return createSimpleUnion(
        typeA,
        typeB,
      );
    }
  } else if (isUnionType(typeB)) {
    let foundCommonAlternativeType: boolean = false;

    const types: IUnknownType[] = typeB.types.map((_typeB: IUnknownType): IUnknownType => {
      if (isAlternativeType(_typeB)) {
        foundCommonAlternativeType = true;

        const commonTypes: IUnknownType[] = _typeB.types.filter((_typeB: IUnknownType): boolean => {
          return doesAlternativeTypeContainsUnknownType(typeA, _typeB);
        });

        if (commonTypes.length > 0) {
          return createAlternativeType(commonTypes);
        } else {
          return _typeB;
        }
      } else {
        if (doesAlternativeTypeContainsUnknownType(typeA, _typeB)) {
          foundCommonAlternativeType = true;
        }
        return _typeB;
      }
    });

    if (!foundCommonAlternativeType) {
      types.push(typeA);
    }

    return createRawUnionType(types as unknown as IUnionTypeTypes);
  } else {
    if (doesAlternativeTypeContainsUnknownType(typeA, typeB)) {
      return typeB;
    } else {
      return createSimpleUnion(
        typeA,
        typeB,
      );
    }
  }
}
