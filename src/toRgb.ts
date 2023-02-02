import toObject from './toObject';
import { objectToRgb } from './utils';

import type { Color, RgbaString, RgbString } from './types';

/**
 * Converts color to rgb(…) or rgba(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in rgb(…) or rgba(…) format, whichever is applicable
 */
export default function toRgb(color: Color): RgbString | RgbaString {
  const rgbObject = toObject(color);

  return objectToRgb(rgbObject);
}
