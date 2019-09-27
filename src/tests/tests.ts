import { DecodeFromJBSON, EncodeToJBSON } from '../core/function-based/jbson';
import { testJBSON } from './jbson.test';

export async function test() {
  await testJBSON();
  // const obj: any = {};
  // obj.obj = obj;
  // console.log(EncodeToJBSON(obj));
}
