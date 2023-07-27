import { describe, expect, it } from 'vitest';
import toHsl from './toHsl.js';

import { colors } from '../test_data.js';

describe('toHsl()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toHsl(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.hsl}
    ${colors.white.hexAlpha}      | ${colors.white.hsl}
    ${colors.white.hexShort}      | ${colors.white.hsl}
    ${colors.white.rgb}           | ${colors.white.hsl}
    ${colors.white.rgbNoSpace}    | ${colors.white.hsl}
    ${colors.white.rgba}          | ${colors.white.hsl}
    ${colors.white.rgbaNoSpace}   | ${colors.white.hsl}
    ${colors.white.hsl}           | ${colors.white.hsl}
    ${colors.white.hslNoSpace}    | ${colors.white.hsl}
    ${colors.white.hsla}          | ${colors.white.hsl}
    ${colors.white.hslaNoSpace}   | ${colors.white.hsl}
    ${colors.red.hex}             | ${colors.red.hsl}
    ${colors.red.hexAlpha}        | ${colors.red.hsl}
    ${colors.red.hexShort}        | ${colors.red.hsl}
    ${colors.red.rgb}             | ${colors.red.hsl}
    ${colors.red.rgbNoSpace}      | ${colors.red.hsl}
    ${colors.red.rgba}            | ${colors.red.hsl}
    ${colors.red.rgbaNoSpace}     | ${colors.red.hsl}
    ${colors.red.hsl}             | ${colors.red.hsl}
    ${colors.red.hslNoSpace}      | ${colors.red.hsl}
    ${colors.red.hsla}            | ${colors.red.hsl}
    ${colors.red.hslaNoSpace}     | ${colors.red.hsl}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.hsla}
    ${colors.semiRed.rgba}        | ${colors.semiRed.hsla}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.hsla}
    ${colors.semiRed.hsla}        | ${colors.semiRed.hsla}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.hsla}
    ${colors.orange.hex}          | ${colors.orange.hsl}
    ${colors.yellow.hex}          | ${colors.yellow.hsl}
    ${colors.lime.hex}            | ${colors.lime.hsl}
    ${colors.green.hex}           | ${colors.green.hsl}
    ${colors.teal.hex}            | ${colors.teal.hsl}
    ${colors.cyan.hex}            | ${colors.cyan.hsl}
    ${colors.lightblue.hex}       | ${colors.lightblue.hsl}
    ${colors.blue.hex}            | ${colors.blue.hsl}
    ${colors.purple.hex}          | ${colors.purple.hsl}
    ${colors.pink.hex}            | ${colors.pink.hsl}
    ${colors.magenta.hex}         | ${colors.magenta.hsl}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toHsl(input);

    expect(result).toEqual(expectedResult);
  });
});
