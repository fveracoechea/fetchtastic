# fetchtastic()

```ts
function fetchtastic(baseUrl?, controller?): Fetchtastic
```

Creates a new instance of Fetchtastic which represents an HTTP request configuration.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseUrl`? | `string` \| `URL` | The base `URL` for the requests. |
| `controller`? | `AbortController` | An optional `AbortController` instance for aborting the request. |

## Returns

[`Fetchtastic`](../classes/Fetchtastic.md)
