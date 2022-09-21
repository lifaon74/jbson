import { IUnknownType } from '../unknown/unknown-type.type';
import { IAlternativeType, IAlternativeTypeTypes } from './alternative-type.type';
import { createRawAlternativeType } from './create-raw-alternative-type';

export type ICreateAlternativeTypeResult<GTypes extends readonly IUnknownType[]> =
  GTypes extends []
    ? never
    : (
      GTypes extends [infer GType]
        ? GType
        : IAlternativeType
      );

export function createAlternativeType<GTypes extends readonly IUnknownType[]>(
  types: GTypes,
): ICreateAlternativeTypeResult<GTypes> {
  if (types.length === 0) {
    throw new Error(`Cannot create an empty alternative type`);
  } else if (types.length === 1) {
    return types[0] as ICreateAlternativeTypeResult<GTypes>;
  } else {
    return createRawAlternativeType(types as unknown as IAlternativeTypeTypes) as ICreateAlternativeTypeResult<GTypes>;
  }
}
