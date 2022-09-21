import { IObjectType, IObjectTypeProperty } from './object-type.type';

/**
 * INFO the 'object' takes the ownership of the properties array
 */
export function createObjectType(
  properties: IObjectTypeProperty[],
): IObjectType {
  return {
    type: 'object',
    properties: properties.sort((
      [a]: IObjectTypeProperty,
      [b]: IObjectTypeProperty,
    ): number => {
      return (a === b) ? 0 : ((a < b) ? -1 : 1);
    }),
  };
}
