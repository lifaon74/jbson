import { createRawUnionType } from './create-raw-union-type';
import { IUnionType, IUnionTypeTypes } from './union-type.type';

export type ICreateUnionTypeResult<GTypes extends IUnionTypeTypes> =
  GTypes extends [infer GType]
    ? GType
    : IUnionType;

export function createUnionType<GTypes extends IUnionTypeTypes>(
  types: GTypes,
): ICreateUnionTypeResult<GTypes> {
  return (
    (types.length === 1)
      ? types[0]
      : createRawUnionType(types)
  ) as ICreateUnionTypeResult<GTypes>;
}
