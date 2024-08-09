# 🌩️ Fetchtastic

Small wrapper around fetch designed to perform more predictable and type-safe
network requests.

[![GitHub issues](https://img.shields.io/github/issues-raw/fveracoechea/fetchtastic?color=blue)](https://github.com/fveracoechea/fetchtastic/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/fveracoechea/fetchtastic)](https://github.com/fveracoechea/fetchtastic/pulse)
[![bundle.js](https://deno.bundlejs.com/?q=fetchtastic&badge)](https://bundlejs.com/?q=fetchtastic)
[![npm](https://img.shields.io/npm/v/fetchtastic?color=blue)](https://www.npmjs.com/package/fetchtastic)
[![npm](https://img.shields.io/npm/dm/fetchtastic.svg?color=blue)](https://www.npmjs.com/package/fetchtastic)

| ✨  | Features    |                                                         |
| --- | ----------- | ------------------------------------------------------- |
| 🪶  | Lightweight | Less than 3kB gzipped                                   |
| 🧩  | Composable  | Safely reuse previous configurations                    |
| 😀  | Intuitive   | Clean and easy to use API                               |
| 🛡️  | Type safe   | Strongly typed, written in TypeScript                   |
| 🛠️  | Isomorphic  | Compatible with modern `browsers`, `Node.js` and `Deno` |
| ✅  | Well Tested | Covered by unit tests                                   |

## 📖 Documentation

Visit [fetchtastic-docs.vercel.app](https://fveracoechea.github.io/fetchtastic/)
to view the full documentation.

## ⚡Getting Started

npm

```sh
npm install fetchtastic
```

pnpm

```sh
pnpm add fetchtastic
```

yarn

```sh
yarn add fetchtastic
```

deno

```typescript
import { fetchtastic } from 'https://deno.land/x/fetchtastic/lib/mod.ts';
```

### Basic usage

```typescript
const api = fetchtastic('https://jsonplaceholder.typicode.com')
  .setOptions({ cache: 'default', mode: 'cors' })
  .appendHeader('Content-Type', 'application/json');

const blogPosts = await api
  .get('/posts')
  .setSearchParams({ page: 1, per_page: 12 })
  .json();

await api.url('/albums').post({ title: 'My New Album' }).resolve();
```

## 🕹️ Contributing

Contributions are welcome and highly appreciated. However, before you jump right
into it, we would like you to review our
[Contribution Guidelines](https://github.com/fveracoechea/fetchtastic/blob/main/CONTRIBUTING.md)
to make sure you have a smooth experience.
