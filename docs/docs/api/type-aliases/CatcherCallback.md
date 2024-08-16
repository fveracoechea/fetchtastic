# CatcherCallback()

```ts
type CatcherCallback: (error, config) => void | Promise<Response | void>;
```

Callback function used to handle fetch response errors.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | [`ResponseError`](../classes/ResponseError.md) |
| `config` | [`Fetchtastic`](../classes/Fetchtastic.md) |

## Returns

`void` \| `Promise`\<`Response` \| `void`\>
