[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/jbson.svg)](https://www.npmjs.com/package/@lifaon/jbson)
![npm](https://img.shields.io/npm/dm/@lifaon/jbson.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/jbson.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/jbson.svg)

## JBSON


## 📦 Installation

```bash
yarn add @lifaon/jbson
# or
npm install @lifaon/jbson --save
```

This library supports:

- **common-js** (require): transpiled as es2020, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll probably need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/jbson](https://cdn.skypack.dev/@lifaon/jbson)
