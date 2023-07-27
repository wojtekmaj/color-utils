import toObject from './toObject.js';
import { objectToHex } from './utils.js';

import type { Color, HashHexString } from './types.js';

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
