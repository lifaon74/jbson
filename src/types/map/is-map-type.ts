import { IUnknownType } from '../unknown/unknown-type.type';
import { IMapType } from './map-type.type';

export function isMapType(
  value: IUnknownType,
): value is IMapType {
  return (value.type === 'map');
}
