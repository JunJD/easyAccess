import { isEqual, isObject, transform } from 'lodash-es';
import { merge as _merge, mergeWith } from 'lodash-es';


export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * 用于合并对象，如果是数组则直接替换
 * @param target
 * @param source
 */
export const merge: typeof _merge = <T = object>(target: T, source: T) =>
  mergeWith({}, target, source, (obj, src) => {
    if (Array.isArray(obj)) return src;
  });


export const difference = <T extends object>(object: T, base: T) => {
  const changes = (object: any, base: any) =>
    transform(object, (result: any, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });

  return changes(object, base);
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}