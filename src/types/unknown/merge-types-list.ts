import { UNDEFINED_TYPE } from '../undefined/undefined-type.constant';
import { mergeUnknownTypes } from './merge-unknown-types';
import { IUnknownType } from './unknown-type.type';

export function mergeTypesList(
  types: readonly IUnknownType[],
): IUnknownType {
  return (types.length === 0)
    ? UNDEFINED_TYPE
    : types.slice(1).reduce(mergeUnknownTypes, types[0]);
}
