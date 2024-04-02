[![npm](https://img.shields.io/npm/v/@wojtekmaj/color-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/color-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/color-utils.svg) [![CI](https://github.com/wojtekmaj/color-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/color-utils/actions)

# Color-Utils

A collection of color-related utilities.

## tl;dr

- Install by executing `npm install @wojtekmaj/color-utils` or `yarn add @wojtekmaj/color-utils`.
- Import by adding `import * as colorUtils from '@wojtekmaj/color-utils'`.
- Do stuff with it!
  ```ts
  toRgb('#ff0000'); // "rgb(255, 0, 0)"
  ```

## User guide

### `alpha()`

Adds/changes alpha channel in a given color.

#### Sample usage

```ts
import { alpha } from '@wojtekmaj/color-utils';

alpha('#f00', 0.5); // "rgba(255, 0, 0, 0.5)"
alpha('#00ff00', 0.1); // "rgba(0, 255, 0, 0.1)"
alpha('#0000ff80', 0.1); // "rgba(0, 0, 255, 0.1)"
alpha('rgb(255, 0, 0)', 0.5); // "rgba(255, 0, 0, 0.5)"
alpha('rgb(255 0 0)', 0.5); // "rgba(255, 0, 0, 0.5)"
alpha('rgba(0, 0, 255, 0.5)', 0.1); // "rgba(0, 0, 255, 0.1)"
alpha('rgb(0 0 255 / 0.5)', 0.1); // "rgba(0, 0, 255, 0.1)"
alpha('hsl(0, 100%, 50%)', 0.5); // "rgba(255, 0, 0, 0.5)"
alpha('hsl(0 100% 50%)', 0.5); // "rgba(255, 0, 0, 0.5)"
alpha('hsla(0, 100%, 50%, 0.5)', 0.1); // "rgba(255, 0, 0, 0.1)"
alpha('hsla(0 100% 50% / 0.5)', 0.1); // "rgba(255, 0, 0, 0.1)"
```

### `mix()`

Mixes colors together. If ratio is not given, colors are blended evenly (ratio = 0.5).

#### Sample usage

```ts
import { mix } from '@wojtekmaj/color-utils';

mix('#ff0000', '#000', 0.5); // "#800000"
mix('rgb(255, 0, 0)', '#fff', 0.5); // "#ff8080"
mix('rgb(255 0 0)', '#fff', 0.5); // "#ff8080"
mix('hsl(0, 100%, 50%)', '#000000', 0.5); // "#800000"
mix('hsl(0 100% 50%)', '#000000', 0.5); // "#800000"
```

### `mixBlack()`

Mixes color with black.

#### Sample usage

```ts
import { mixBlack } from '@wojtekmaj/color-utils';

mixBlack('#ff0000', 0.5); // "#800000"
mixBlack('rgb(255, 0, 0)', 0.5); // "#800000"
mixBlack('rgb(255 0 0)', 0.5); // "#800000"
mixBlack('hsl(0, 100%, 50%)', 0.5); // "#800000"
mixBlack('hsl(0 100% 50%)', 0.5); // "#800000"
```

### `mixWhite()`

Mixes color with white.

#### Sample usage

```ts
import { mixWhite } from '@wojtekmaj/color-utils';

mixWhite('#ff0000', 0.5); // "#ff8080"
mixWhite('rgb(255, 0, 0)', 0.5); // "#ff8080"
mixWhite('rgb(255 0 0)', 0.5); // "#ff8080"
mixWhite('hsl(0, 100%, 50%)', 0.5); // "#ff8080"
mixWhite('hsl(0 100% 50%)', 0.5); // "#ff8080"
```

### `toHex()`

Converts color to hex format.

#### Sample usage

```ts
import { toHex } from '@wojtekmaj/color-utils';

toHex('rgb(255, 0, 0)'); // "#ff0000"
toHex('rgb(255 0 0)'); // "#ff0000"
toHex('rgb(0, 255, 0)'); // "#00ff00"
toHex('rgb(0 255 0)'); // "#00ff00"
toHex('rgba(0, 0, 255, 0.5)'); // "#0000ff80"
toHex('rgb(0 0 255 / 0.5)'); // "#0000ff80"
toHex('hsl(0, 100%, 50%)'); // "#ff0000"
toHex('hsl(0 100% 50%)'); // "#ff0000"
toHex('hsla(0, 100%, 50%, 0.5)'); // "#ff000080"
toHex('hsl(0 100% 50% / 0.5)'); // "#ff000080"
```

### `toHsl()`

Converts color to hsl(…) or hsla(…) format, whichever is applicable.

#### Sample usage

```ts
import { toHsl } from '@wojtekmaj/color-utils';

toHsl('#f00'); // "hsl(0, 100%, 50%)"
toHsl('#00ff00'); // "hsl(120, 100%, 50%)"
toHsl('#0000ff80'); // "hsla(240, 100%, 50%, 0.5)"
toHsl('rgb(255, 0, 0)'); // "hsl(0, 100%, 50%)"
toHsl('rgb(255 0 0)'); // "hsl(0, 100%, 50%)"
toHsl('rgb(255, 0, 0, 0.5)'); // "hsla(0, 100%, 50%, 0.5)"
toHsl('rgb(255 0 0 / 0.5)'); // "hsla(0, 100%, 50%, 0.5)"
```

### `toObject()`

Converts color to { r, g, b, a? } object.

#### Sample usage

```ts
import { toObject } from '@wojtekmaj/color-utils';

toObject('#f00'); // { r: 255, g: 0, b: 0 }
toObject('#00ff00'); // { r: 0, g: 255, b: 0 }
toObject('#0000ff80'); // { r: 0, g: 0, b: 255, a: 0.5 }
toObject('rgb(255, 0, 0)'); // { r: 255, g: 0, b: 0 }
toObject('rgb(255 0 0)'); // { r: 255, g: 0, b: 0 }
toObject('rgb(0, 255, 0)'); // { r: 0, g: 255, b: 0 }
toObject('rgb(0 255 0)'); // { r: 0, g: 255, b: 0 }
toObject('rgba(0, 0, 255, 0.5)'); // { r: 0, g: 0, b: 255, a: 0.5 }
toObject('rgba(0 0 255 / 0.5)'); // { r: 0, g: 0, b: 255, a: 0.5 }
toObject('hsl(0, 100%, 50%)'); // { r: 255, g: 0, b: 0 }
toObject('hsl(0 100% 50%)'); // { r: 255, g: 0, b: 0 }
toObject('hsla(0, 100%, 50%, 0.5)'); // { r: 255, g: 0, b: 0, a: 0.5 }
toObject('hsl(0 100% 50% / 0.5)'); // { r: 255, g: 0, b: 0, a: 0.5 }
```

### `toRgb()`

Converts color to rgb(…) or rgba(…) format, whichever is applicable.

#### Sample usage

```ts
import { toRgb } from '@wojtekmaj/color-utils';

toRgb('#f00'); // "rgb(255, 0, 0)"
toRgb('#00ff00'); // "rgb(0, 255, 0)"
toRgb('#0000ff80'); // "rgba(0, 0, 255, 0.5)"
toRgb('hsl(0, 100%, 50%)'); // "rgb(255, 0, 0)"
toRgb('hsl(0 100% 50%)'); // "rgb(255, 0, 0)"
toRgb('hsla(0, 100%, 50%, 0.5)'); // "rgb(255, 0, 0, 0.5)"
toRgb('hsl(0 100% 50% / 0.5)'); // "rgb(255, 0, 0, 0.5)"
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
