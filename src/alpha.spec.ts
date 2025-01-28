import { describe, expect, it } from 'vitest';
import alpha from './alpha.js';

import { colors } from '../test_data.js';

describe('alpha()', () => {
  it.each`
    input   | a
    ${null} | ${0}
    ${''}   | ${0}
  `('should throw "color is required" given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow('color is required');
  });

  it.each`
    input       | a
    ${'potato'} | ${0}
  `('should throw "Invalid color provided" given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow('Invalid color provided');
  });

  it.each`
    input               | a
    ${colors.white.hex} | ${null}
  `('should throw "alpha is required" given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow('alpha is required');
  });

  it.each`
    input               | a
    ${colors.white.hex} | ${'potato'}
    ${colors.white.hex} | ${Number.NaN}
  `('should throw "Invalid alpha provided" given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow('Invalid alpha provided');
  });

  it.each`
    input                       | a      | expectedResult
    ${colors.white.hex}         | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hexAlpha}    | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hexShort}    | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgb}         | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgbNoSpace}  | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgbModern}   | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgba}        | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgbaNoSpace} | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.rgbaModern}  | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hsl}         | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hslNoSpace}  | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hslModern}   | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hsla}        | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hslaNoSpace} | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.white.hslaModern}  | ${0.5} | ${colors.semiWhite.rgbaModern}
    ${colors.red.hex}           | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hexAlpha}      | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hexShort}      | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgb}           | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgbNoSpace}    | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgbModern}     | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgba}          | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgbaNoSpace}   | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.rgbaModern}    | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hsl}           | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hslNoSpace}    | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hslModern}     | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hsla}          | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hslaNoSpace}   | ${0.5} | ${colors.semiRed.rgbaModern}
    ${colors.red.hslaModern}    | ${0.5} | ${colors.semiRed.rgbaModern}
  `('returns $expectedResult given $input, $a', ({ input, a, expectedResult }) => {
    const result = alpha(input, a);

    expect(result).toEqual(expectedResult);
  });
});
