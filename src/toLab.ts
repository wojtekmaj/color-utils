import toObject from './toObject.js';

import type { Color, LabString, RgbObject } from './types.js';

/**
 * Given 123.456789, returns "123.457", but given 123, returns "123". Given -0, returns "0".
 */
function toFixedIfNeeded(value: number): string {
  const valueText = value.toFixed(3);

  const valueTextTrimmed = valueText.replace(/\.?0+$/, '');

  if (valueTextTrimmed === '-0') {
    return '0';
  }

  return valueTextTrimmed;
}

function objectToLab(rgbObject: RgbObject): LabString {
  if (!rgbObject) {
    throw new Error('rgbObject is required');
  }

  const { r, g, b, a } = rgbObject;

  // Convert to 0-1 range
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  // Get sRGB values
  const redLinear = red <= 0.04045 ? red / 12.92 : ((red + 0.055) / 1.055) ** 2.4;
  const greenLinear = green <= 0.04045 ? green / 12.92 : ((green + 0.055) / 1.055) ** 2.4;
  const blueLinear = blue <= 0.04045 ? blue / 12.92 : ((blue + 0.055) / 1.055) ** 2.4;

  // Convert to XYZ
  const x = redLinear * 0.4124564 + greenLinear * 0.3575761 + blueLinear * 0.1804375;
  const y = redLinear * 0.2126729 + greenLinear * 0.7151522 + blueLinear * 0.072175;
  const z = redLinear * 0.0193339 + greenLinear * 0.119192 + blueLinear * 0.9503041;

  // Convert to Lab
  const xNormalized = x / 0.95047;
  const yNormalized = y / 1.0;
  const zNormalized = z / 1.08883;

  const xFinal = xNormalized > 0.008856 ? xNormalized ** (1 / 3) : 7.787 * xNormalized + 16 / 116;
  const yFinal = yNormalized > 0.008856 ? yNormalized ** (1 / 3) : 7.787 * yNormalized + 16 / 116;
  const zFinal = zNormalized > 0.008856 ? zNormalized ** (1 / 3) : 7.787 * zNormalized + 16 / 116;

  const labL = 116 * yFinal - 16;
  const labA = 500 * (xFinal - yFinal);
  const labB = 200 * (yFinal - zFinal);

  const labLText = toFixedIfNeeded(labL);
  const labAText = toFixedIfNeeded(labA);
  const labBText = toFixedIfNeeded(labB);

  if (a === undefined && a !== 1) {
    return `lab(${labLText} ${labAText} ${labBText})`;
  }

  return `lab(${labLText} ${labAText} ${labBText} / ${a})`;
}

/**
 * Converts color to lab(…) format.
 *
 * @param {Color} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @returns {LabString} Color in lab(…) format
 */
export default function toLab(color: Color): LabString {
  const rgbObject = toObject(color);

  return objectToLab(rgbObject);
}
