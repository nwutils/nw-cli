# nw-cli

Command line interface for building NW.js apps

## Getting Started

1. Install package: `npm i -g @nwutils/cli`

## CLI

### create

Create a Vanilla JavaScript project.

```shell
nw create MyApp
```

Choose your template (defaults to `vanilla-js`) and out directory (defaults to `.`).

```shell
nw create --template=react-js --outDir=/path/to/project/dir MyApp
```

> Note: If you find a template is missing, feel free to open an issue or pull request.

## API

Apply NW.js specific polyfills to your NW.js application.

```js
import { pollyfill } from '@nwutils/cli';

// Run this as early in your application lifecycle as possible.
pollyfill();
```

## Roadmap

* [ ] Add react-js template
* [ ] Package custom node test coverage action.
* [ ] Properly deal with the types problem. This will be a major pain point for developers using TypeScript.
