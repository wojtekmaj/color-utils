import { describe, expect, it } from 'vitest';

import { colors } from '../test_data.js';
import toHsl from './toHsl.js';

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
    ${colors.white.hex}           | ${colors.white.hslModern}
    ${colors.white.hexAlpha}      | ${colors.white.hslModern}
    ${colors.white.hexShort}      | ${colors.white.hslModern}
    ${colors.white.rgb}           | ${colors.white.hslModern}
    ${colors.white.rgbNoSpace}    | ${colors.white.hslModern}
    ${colors.white.rgbModern}     | ${colors.white.hslModern}
    ${colors.white.rgba}          | ${colors.white.hslModern}
    ${colors.white.rgbaNoSpace}   | ${colors.white.hslModern}
    ${colors.white.rgbaModern}    | ${colors.white.hslModern}
    ${colors.white.hsl}           | ${colors.white.hslModern}
    ${colors.white.hslNoSpace}    | ${colors.white.hslModern}
    ${colors.white.hslModern}     | ${colors.white.hslModern}
    ${colors.white.hsla}          | ${colors.white.hslModern}
    ${colors.white.hslaNoSpace}   | ${colors.white.hslModern}
    ${colors.white.hslaModern}    | ${colors.white.hslModern}
    ${colors.red.hex}             | ${colors.red.hslModern}
    ${colors.red.hexAlpha}        | ${colors.red.hslModern}
    ${colors.red.hexShort}        | ${colors.red.hslModern}
    ${colors.red.rgb}             | ${colors.red.hslModern}
    ${colors.red.rgbNoSpace}      | ${colors.red.hslModern}
    ${colors.red.rgbModern}       | ${colors.red.hslModern}
    ${colors.red.rgba}            | ${colors.red.hslModern}
    ${colors.red.rgbaNoSpace}     | ${colors.red.hslModern}
    ${colors.red.rgbaModern}      | ${colors.red.hslModern}
    ${colors.red.hsl}             | ${colors.red.hslModern}
    ${colors.red.hslNoSpace}      | ${colors.red.hslModern}
    ${colors.red.hslModern}       | ${colors.red.hslModern}
    ${colors.red.hsla}            | ${colors.red.hslModern}
    ${colors.red.hslaNoSpace}     | ${colors.red.hslModern}
    ${colors.red.hslaModern}      | ${colors.red.hslModern}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.hslaModern}
    ${colors.semiRed.rgba}        | ${colors.semiRed.hslaModern}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.hslaModern}
    ${colors.semiRed.rgbaModern}  | ${colors.semiRed.hslaModern}
    ${colors.semiRed.hsla}        | ${colors.semiRed.hslaModern}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.hslaModern}
    ${colors.semiRed.hslaModern}  | ${colors.semiRed.hslaModern}
    ${colors.orange.hex}          | ${colors.orange.hslModern}
    ${colors.yellow.hex}          | ${colors.yellow.hslModern}
    ${colors.lime.hex}            | ${colors.lime.hslModern}
    ${colors.green.hex}           | ${colors.green.hslModern}
    ${colors.teal.hex}            | ${colors.teal.hslModern}
    ${colors.cyan.hex}            | ${colors.cyan.hslModern}
    ${colors.lightblue.hex}       | ${colors.lightblue.hslModern}
    ${colors.blue.hex}            | ${colors.blue.hslModern}
    ${colors.purple.hex}          | ${colors.purple.hslModern}
    ${colors.pink.hex}            | ${colors.pink.hslModern}
    ${colors.magenta.hex}         | ${colors.magenta.hslModern}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toHsl(input);

    expect(result).toEqual(expectedResult);
  });
});
