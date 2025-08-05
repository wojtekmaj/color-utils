import { describe, expect, it } from 'vitest';

import { colors } from '../test_data.js';
import mixBlack from './mixBlack.js';

describe('mixBlack()', () => {
  it.each`
    input   | a
    ${null} | ${0}
    ${''}   | ${0}
  `('should throw "color is required" given $input, $a', ({ input, a }) => {
    expect(() => mixBlack(input, a)).toThrow('color is required');
  });

  it.each`
    input       | a
    ${'potato'} | ${0}
  `('should throw "Invalid color provided" given $input, $a', ({ input, a }) => {
    expect(() => mixBlack(input, a)).toThrow('Invalid color provided');
  });

  it.each`
    input               | a
    ${colors.white.hex} | ${'potato'}
    ${colors.white.hex} | ${Number.NaN}
  `('should throw "Invalid ratio provided" given $input, $a', ({ input, a }) => {
    expect(() => mixBlack(input, a)).toThrow('Invalid ratio provided');
  });

  it.each`
    input                       | ratio   | expectedResult
    ${colors.white.hex}         | ${''}   | ${colors.gray.hex}
    ${colors.white.hex}         | ${null} | ${colors.gray.hex}
    ${colors.white.hex}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexAlpha}    | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexShort}    | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgb}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgba}        | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsl}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsla}        | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexAlpha}      | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexShort}      | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgb}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbNoSpace}    | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbModern}     | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgba}          | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbaNoSpace}   | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbaModern}    | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsl}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslNoSpace}    | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslModern}     | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsla}          | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslaNoSpace}   | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslaModern}    | ${0.5}  | ${colors.darkRed.hex}
  `('returns $expectedResult given $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixBlack(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});
