# 🌩️ Fetchtastic

Small wrapper around fetch designed to perform more predictable and type-safe network requests.

[![MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/fveracoechea/fetchtastic/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues-raw/fveracoechea/fetchtastic)](https://github.com/fveracoechea/fetchtastic/issues)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/fveracoechea/fetchtastic)](https://github.com/fveracoechea/fetchtastic/pulse)
[![npm](https://img.shields.io/npm/v/fetchtastic?color=blue)](https://www.npmjs.com/package/fetchtastic)
[![npm](https://img.shields.io/npm/dm/fetchtastic.svg?color=blue)](https://www.npmjs.com/package/fetchtastic)

### 📖 [Documentation.](https://fetchtastic-docs.vercel.app/)

| ✨  | Features    |                                                         |
| --- | ----------- | ------------------------------------------------------- |
| 🪶  | Lightweight | Less than 3KB gzipped                                   |
| 🧩  | Composable  | Safely reuse previous configurations                    |
| ⚡  | Intuitive   | Clean and easy to use API                               |
| 🛡️  | Type safe   | Strongly typed, written in TypeScript                   |
| 🛠️  | Isomorphic  | Compatible with modern `browsers`, `Node.js` and `Deno` |
| ✅  | Well Tested | Covered by unit tests                                   |

```typescript
const api = new Fetchtastic('https://jsonplaceholder.typicode.com')
  .setOptions({ cache: 'default', mode: 'cors' })
  .headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

const blogData = await api
  .searchParams({ page: 1, per_page: 12 })
  .get('/posts')
  .json(PostSchema.parse);

await api.post('/albums', { title: 'My New Album' }).resolve();
```

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
import { Fetchtastic } from 'https://deno.land/x/fetchtastic/lib/mod.ts';
```
