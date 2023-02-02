import mix from './mix';

import { colors } from '../test_data';

describe('mix()', () => {
  it.each`
    color1              | color2              | ratio
    ${'potato'}         | ${'potato'}         | ${0.5}
    ${''}               | ${''}               | ${0.5}
    ${null}             | ${null}             | ${0.5}
    ${colors.white.hex} | ${'potato'}         | ${0.5}
    ${colors.white.hex} | ${''}               | ${0.5}
    ${colors.white.hex} | ${null}             | ${0.5}
    ${'potato'}         | ${colors.white.hex} | ${0.5}
    ${''}               | ${colors.white.hex} | ${0.5}
    ${null}             | ${colors.white.hex} | ${0.5}
    ${colors.white.hex} | ${colors.black.hex} | ${'potato'}
  `('should throw given $color1, $color2, $ratio', ({ color1, color2, ratio }) => {
    expect(() => mix(color1, color2, ratio)).toThrow();
  });

  it.each`
    color1                      | color2              | ratio   | expectedResult
    ${colors.white.hex}         | ${colors.black.hex} | ${''}   | ${colors.gray.hex}
    ${colors.white.hex}         | ${colors.black.hex} | ${null} | ${colors.gray.hex}
    ${colors.white.hex}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexAlpha}    | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexShort}    | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgb}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbNoSpace}  | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgba}        | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbaNoSpace} | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsl}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslNoSpace}  | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsla}        | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslaNoSpace} | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexAlpha}      | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexShort}      | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgb}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbNoSpace}    | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgba}          | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbaNoSpace}   | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsl}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslNoSpace}    | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsla}          | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslaNoSpace}   | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
  `(
    'returns $expectedResult given $color1, $color2, $ratio',
    ({ color1, color2, ratio, expectedResult }) => {
      const result = mix(color1, color2, ratio);

      expect(result).toEqual(expectedResult);
    },
  );
});
