import toObject from './toObject.js';

import type { Color, HslaString, HslString, RgbObject } from './types.js';

function objectToHsl(rgbObject: RgbObject): HslString | HslaString {
  if (!rgbObject) {
    throw new Error('rgbObject is required');
  }

  const { r, g, b, a } = rgbObject;

  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const minRatio = Math.min(rRatio, gRatio, bRatio);
  const maxRatio = Math.max(rRatio, gRatio, bRatio);
  const delta = maxRatio - minRatio;

  const h60 = (() => {
    if (!delta) {
      return 0;
    }

    if (maxRatio === rRatio) {
      return ((gRatio - bRatio) / delta) % 6;
    }

    if (maxRatio === gRatio) {
      return (bRatio - rRatio) / delta + 2;
    }

    if (maxRatio === bRatio) {
      return (rRatio - gRatio) / delta + 4;
    }

    return 0;
  })();
  const lRatio = (minRatio + maxRatio) / 2;
  const sRatio = delta ? delta / (1 - Math.abs(2 * lRatio - 1)) : 0;

  const h = (Math.round(h60 * 60) + 360) % 360;
  const s = Math.round(sRatio * 100);
  const l = Math.round(lRatio * 100);

  if (a !== undefined && a !== 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Converts color to hsl(…) or hsla(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hsl(…) or hsla(…) format, whichever is applicable
 */
export default function toHsl(color: Color): HslString | HslaString {
  const rgbObject = toObject(color);

  return objectToHsl(rgbObject);
}
