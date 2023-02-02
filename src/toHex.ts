import toObject from './toObject';
import { objectToHex } from './utils';

import type { Color, HashHexString } from './types';

/**
 * Converts color to hex format.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hex format
 */
export default function toHex(color: Color): HashHexString {
  const rgbObject = toObject(color);

  return objectToHex(rgbObject);
}
