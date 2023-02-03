import toObject from './toObject';
import { objectToRgb } from './utils';

import type { Color, NumberFrom0To1, RgbaString, RgbString } from './types';

/**
 * Adds/changes alpha channel in a given color.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} a Alpha (0-1)
 * @returns {String} Color with alpha channel added/changed
 */
export default function alpha(color: Color, a?: NumberFrom0To1): RgbString | RgbaString {
  if (!color) {
    throw new Error('Color is required');
  }

  if (a !== 0 && !a) {
    throw new Error('Alpha is required');
  }

  if (isNaN(a)) {
    throw new Error('Invalid alpha argument provided');
  }

  const rgbObject = toObject(color);

  return objectToRgb(rgbObject && { ...rgbObject, a });
}
