import { describe, expect, it } from 'vitest';
import toHex from './toHex.js';

import { colors } from '../test_data.js';

describe('toHex()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toHex(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.hex}
    ${colors.white.hexAlpha}      | ${colors.white.hex}
    ${colors.white.hexShort}      | ${colors.white.hex}
    ${colors.white.rgb}           | ${colors.white.hex}
    ${colors.white.rgbNoSpace}    | ${colors.white.hex}
    ${colors.white.rgbModern}     | ${colors.white.hex}
    ${colors.white.rgba}          | ${colors.white.hex}
    ${colors.white.rgbaNoSpace}   | ${colors.white.hex}
    ${colors.white.rgbaModern}    | ${colors.white.hex}
    ${colors.white.hsl}           | ${colors.white.hex}
    ${colors.white.hslNoSpace}    | ${colors.white.hex}
    ${colors.white.hslModern}     | ${colors.white.hex}
    ${colors.white.hsla}          | ${colors.white.hex}
    ${colors.white.hslaNoSpace}   | ${colors.white.hex}
    ${colors.white.hslaModern}    | ${colors.white.hex}
    ${colors.red.hex}             | ${colors.red.hex}
    ${colors.red.hexAlpha}        | ${colors.red.hex}
    ${colors.red.hexShort}        | ${colors.red.hex}
    ${colors.red.rgb}             | ${colors.red.hex}
    ${colors.red.rgbNoSpace}      | ${colors.red.hex}
    ${colors.red.rgbModern}       | ${colors.red.hex}
    ${colors.red.rgba}            | ${colors.red.hex}
    ${colors.red.rgbaNoSpace}     | ${colors.red.hex}
    ${colors.red.rgbaModern}      | ${colors.red.hex}
    ${colors.red.hsl}             | ${colors.red.hex}
    ${colors.red.hslNoSpace}      | ${colors.red.hex}
    ${colors.red.hslModern}       | ${colors.red.hex}
    ${colors.red.hsla}            | ${colors.red.hex}
    ${colors.red.hslaNoSpace}     | ${colors.red.hex}
    ${colors.red.hslaModern}      | ${colors.red.hex}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.rgba}        | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.rgbaModern}  | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.hsla}        | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.hslaModern}  | ${colors.semiRed.hexAlpha}
    ${colors.orange.hsl}          | ${colors.orange.hex}
    ${colors.yellow.hsl}          | ${colors.yellow.hex}
    ${colors.lime.hsl}            | ${colors.lime.hex}
    ${colors.green.hsl}           | ${colors.green.hex}
    ${colors.teal.hsl}            | ${colors.teal.hex}
    ${colors.cyan.hsl}            | ${colors.cyan.hex}
    ${colors.lightblue.hsl}       | ${colors.lightblue.hex}
    ${colors.blue.hsl}            | ${colors.blue.hex}
    ${colors.purple.hsl}          | ${colors.purple.hex}
    ${colors.pink.hsl}            | ${colors.pink.hex}
    ${colors.magenta.hsl}         | ${colors.magenta.hex}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toHex(input);

    expect(result).toEqual(expectedResult);
  });
});
