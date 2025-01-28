import mix from './mix.js';

import type { Color, HashHexString, NumberFrom0To1 } from './types.js';

/**
 * Mixes color with white.
 *
 * @param {Color} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {NumberFrom0To1} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {HashHexString} Color in hex format
 */
export default function mixWhite(color: Color, ratio?: NumberFrom0To1): HashHexString {
  if (!color) {
    throw new Error('color is required');
  }

  return mix(color, 'fff', ratio);
}
