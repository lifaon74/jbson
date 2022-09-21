import { IMapType } from '../../../types/map/map-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { MAP_TYPE_BYTE } from '../types.constant';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_map_type(
  write: WriteFunction,
  type: IMapType,
): void {
  write(MAP_TYPE_BYTE);
  jbson_encode_unknown_type(write, type.keyType);
  jbson_encode_unknown_type(write, type.valueType);
}
