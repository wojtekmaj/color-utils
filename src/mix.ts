import toObject from './toObject.js';
import { objectToHex } from './utils.js';

import type { Color, HashHexString, NumberFrom0To1, NumberFrom0To255 } from './types.js';

function mixChannels(
  channel1: NumberFrom0To255,
  channel2: NumberFrom0To255,
  ratio: NumberFrom0To1,
): number {
  const channelA = channel1 * ratio;
  const channelB = channel2 * (1 - ratio);

  return Math.round(channelA + channelB);
}

/**
 * Mixes two colors together.
 *
 * @param {Color} color1 Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {Color} color2 Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {NumberFrom0To1} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {HashHexString} Color in hex format
 */
export default function mix(
  color1: Color,
  color2: Color,
  ratio: NumberFrom0To1 = 0.5,
): HashHexString {
  if (!color1) {
    throw new Error('color1 is required');
  }

  if (!color2) {
    throw new Error('color2 is required');
  }

  if (isNaN(ratio)) {
    throw new Error('Invalid ratio');
  }

  if (ratio !== 0 && !ratio) {
    ratio = 0.5;
  }

  const rgbObject1 = toObject(color1);
  const rgbObject2 = toObject(color2);

  if (!rgbObject1 || !rgbObject2) {
    throw new Error('Invalid color provided');
  }

  const { r: r1, g: g1, b: b1, a: a1 = 1 } = rgbObject1;
  const { r: r2, g: g2, b: b2, a: a2 = 1 } = rgbObject2;

  const ratioWithAlpha = ratio * (a1 / a2);

  const rgbObject = {
    r: mixChannels(r1, r2, ratioWithAlpha),
    g: mixChannels(g1, g2, ratioWithAlpha),
    b: mixChannels(b1, b2, ratioWithAlpha),
  };

  return objectToHex(rgbObject);
}
