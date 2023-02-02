import mix from './mix';

import type { Color, HashHexString, NumberFrom0To1 } from './types';

/**
 * Mixes color with black.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export default function mixBlack(color: Color, ratio?: NumberFrom0To1): HashHexString {
  return mix(color, '000', ratio);
}
