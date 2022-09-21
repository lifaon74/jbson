import { IUnknownType } from '../unknown/unknown-type.type';
import { IUnionType } from './union-type.type';

export function compareUnionTypeWithUnknownType(
  typeA: IUnionType,
  typeB: IUnknownType,
): boolean {
  throw 'TODO'; // TODO
  // return isUnionType(typeB)
  //   && (typeA.types.length === typeB.types.length)
  //   && typeA.types.every((_typeA: IUnknownType): boolean => {
  //     return typeB.types.some((_typeB: IUnknownType): boolean => {
  //       return compareUnknownTypes(_typeA, _typeB);
  //     });
  //   });
}
