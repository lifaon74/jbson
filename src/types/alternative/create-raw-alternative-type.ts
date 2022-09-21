import { IAlternativeType, IAlternativeTypeTypes } from './alternative-type.type';

export function createRawAlternativeType(
  types: IAlternativeTypeTypes,
): IAlternativeType {
  return {
    type: 'alternative',
    types,
  };
}
