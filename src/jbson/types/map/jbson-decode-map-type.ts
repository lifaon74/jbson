import { createMapType } from '../../../types/map/create-map-type';
import { IMapType } from '../../../types/map/map-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_map_type(
  read: ReadFunction,
): IMapType {
  return createMapType(
    jbson_decode_unknown_type(read),
    jbson_decode_unknown_type(read),
  );
}
