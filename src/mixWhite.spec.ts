import { describe, expect, it } from 'vitest';

import { colors } from '../test_data.js';
import mixWhite from './mixWhite.js';

describe('mixWhite()', () => {
  it.each`
    input   | a
    ${null} | ${0}
    ${''}   | ${0}
  `('should throw "color is required" given $input, $a', ({ input, a }) => {
    expect(() => mixWhite(input, a)).toThrow('color is required');
  });

  it.each`
    input       | a
    ${'potato'} | ${0}
  `('should throw "Invalid color provided" given $input, $a', ({ input, a }) => {
    expect(() => mixWhite(input, a)).toThrow('Invalid color provided');
  });

  it.each`
    input               | a
    ${colors.black.hex} | ${'potato'}
    ${colors.black.hex} | ${Number.NaN}
  `('should throw "Invalid ratio provided" given $input, $a', ({ input, a }) => {
    expect(() => mixWhite(input, a)).toThrow('Invalid ratio provided');
  });

  it.each`
    input                       | ratio   | expectedResult
    ${colors.black.hex}         | ${''}   | ${colors.gray.hex}
    ${colors.black.hex}         | ${null} | ${colors.gray.hex}
    ${colors.black.hex}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hexAlpha}    | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hexShort}    | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgb}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgba}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsl}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsla}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexAlpha}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexShort}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgb}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbModern}     | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgba}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbaModern}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsl}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslModern}     | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsla}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslaModern}    | ${0.5}  | ${colors.lightRed.hex}
  `('returns $expectedResult given $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixWhite(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});
