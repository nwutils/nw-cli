# nw-cli

Command line interface for building NW.js apps

## Getting Started

1. Install [Volta](https://volta.sh/)
1. Install package: `npm i -D @nwutils/cli`

## Usage

Apply NW.js specific polyfills to your NW.js application.

```js
import { applyNwjsPolyfills } from '@nwutils/cli';

// Run this as early in your application lifecycle as possible.
applyNwjsPolyfills();
```

## Roadmap

* [ ] Add tests for nw.Window.isDevToolsOpen
* [ ] Setup Vitest Code Coverage Action
* [ ] Setup License Check Action
* [ ] Setup eslint
