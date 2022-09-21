import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IObjectTypeProperties, IObjectTypeProperty } from './object-type.type';

export function compareObjectTypeProperties(
  propertiesA: IObjectTypeProperties,
  propertiesB: IObjectTypeProperties,
): boolean {
  return (propertiesA.length === propertiesB.length)
    && propertiesA.every(([keyA, valueA]: IObjectTypeProperty, index: number): boolean => {
      const [keyB, valueB] = propertiesB[index];
      return (keyA === keyB)
        && compareUnknownTypes(valueA, valueB);
    });
}
