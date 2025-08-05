import { describe, expect, it } from 'vitest';

import { colors } from '../test_data.js';
import toLab from './toLab.js';

describe('toLab()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toLab(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.lab}
    ${colors.white.hexAlpha}      | ${colors.white.lab}
    ${colors.white.hexShort}      | ${colors.white.lab}
    ${colors.white.rgb}           | ${colors.white.lab}
    ${colors.white.rgbNoSpace}    | ${colors.white.lab}
    ${colors.white.rgbModern}     | ${colors.white.lab}
    ${colors.white.rgba}          | ${colors.white.lab}
    ${colors.white.rgbaNoSpace}   | ${colors.white.lab}
    ${colors.white.rgbaModern}    | ${colors.white.lab}
    ${colors.white.hsl}           | ${colors.white.lab}
    ${colors.white.hslNoSpace}    | ${colors.white.lab}
    ${colors.white.hslModern}     | ${colors.white.lab}
    ${colors.white.hsla}          | ${colors.white.lab}
    ${colors.white.hslaNoSpace}   | ${colors.white.lab}
    ${colors.white.hslaModern}    | ${colors.white.lab}
    ${colors.red.hex}             | ${colors.red.lab}
    ${colors.red.hexAlpha}        | ${colors.red.lab}
    ${colors.red.hexShort}        | ${colors.red.lab}
    ${colors.red.rgb}             | ${colors.red.lab}
    ${colors.red.rgbNoSpace}      | ${colors.red.lab}
    ${colors.red.rgbModern}       | ${colors.red.lab}
    ${colors.red.rgba}            | ${colors.red.lab}
    ${colors.red.rgbaNoSpace}     | ${colors.red.lab}
    ${colors.red.rgbaModern}      | ${colors.red.lab}
    ${colors.red.hsl}             | ${colors.red.lab}
    ${colors.red.hslNoSpace}      | ${colors.red.lab}
    ${colors.red.hslModern}       | ${colors.red.lab}
    ${colors.red.hsla}            | ${colors.red.lab}
    ${colors.red.hslaNoSpace}     | ${colors.red.lab}
    ${colors.red.hslaModern}      | ${colors.red.lab}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.lab}
    ${colors.semiRed.rgba}        | ${colors.semiRed.lab}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.lab}
    ${colors.semiRed.rgbaModern}  | ${colors.semiRed.lab}
    ${colors.semiRed.hsla}        | ${colors.semiRed.lab}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.lab}
    ${colors.semiRed.hslaModern}  | ${colors.semiRed.lab}
    ${colors.orange.hex}          | ${colors.orange.lab}
    ${colors.yellow.hex}          | ${colors.yellow.lab}
    ${colors.lime.hex}            | ${colors.lime.lab}
    ${colors.green.hex}           | ${colors.green.lab}
    ${colors.teal.hex}            | ${colors.teal.lab}
    ${colors.cyan.hex}            | ${colors.cyan.lab}
    ${colors.lightblue.hex}       | ${colors.lightblue.lab}
    ${colors.blue.hex}            | ${colors.blue.lab}
    ${colors.purple.hex}          | ${colors.purple.lab}
    ${colors.pink.hex}            | ${colors.pink.lab}
    ${colors.magenta.hex}         | ${colors.magenta.lab}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toLab(input);

    expect(result).toEqual(expectedResult);
  });
});
