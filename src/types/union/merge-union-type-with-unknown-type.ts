import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { createRawUnionType } from './create-raw-union-type';
import { doesUnionTypeContainsUnknownType } from './does-union-type-contains-unknown-type';
import { isUnionType } from './is-union-type';
import { IUnionType } from './union-type.type';

export function mergeUnionTypeWithUnknownType(
  typeA: IUnionType,
  typeB: IUnknownType,
): IUnionType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA) as IUnionType;
  } else if (isUnionType(typeB)) {
    return createRawUnionType([
      ...typeA.types,
      ...typeB.types.filter((_typeB: IUnknownType): boolean => {
        return !doesUnionTypeContainsUnknownType(typeA, _typeB);
      }),
    ]);
  } else {
    return doesUnionTypeContainsUnknownType(typeA, typeB)
      ? typeA
      : createRawUnionType([
        ...typeA.types,
        typeB,
      ]);
  }
}
