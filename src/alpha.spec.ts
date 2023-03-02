import { describe, expect, it } from 'vitest';
import alpha from './alpha';

import { colors } from '../test_data';

describe('alpha()', () => {
  it.each`
    input               | a
    ${'potato'}         | ${0}
    ${''}               | ${0}
    ${null}             | ${0}
    ${colors.white.hex} | ${'potato'}
    ${colors.white.hex} | ${''}
    ${colors.white.hex} | ${null}
  `('should throw given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow();
  });

  it.each`
    input                       | a      | expectedResult
    ${colors.white.hex}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hexAlpha}    | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hexShort}    | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgb}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgbNoSpace}  | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgba}        | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgbaNoSpace} | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hsl}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hslNoSpace}  | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hsla}        | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hslaNoSpace} | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.red.hex}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hexAlpha}      | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hexShort}      | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgb}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgbNoSpace}    | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgba}          | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgbaNoSpace}   | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hsl}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hslNoSpace}    | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hsla}          | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hslaNoSpace}   | ${0.5} | ${colors.semiRed.rgba}
  `('returns $expectedResult given $input, $a', ({ input, a, expectedResult }) => {
    const result = alpha(input, a);

    expect(result).toEqual(expectedResult);
  });
});
