import { IUnknownType } from '../unknown/unknown-type.type';
import { createRawUnionType } from './create-raw-union-type';
import { IUnionType } from './union-type.type';

export function createSimpleUnion(
  typeA: IUnknownType,
  typeB: IUnknownType,
): IUnionType {
  return createRawUnionType([
    typeA,
    typeB,
  ]);
}
