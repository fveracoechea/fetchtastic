# isHttpMethod()

```ts
function isHttpMethod(value): value is "OPTIONS" | "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "PATCH"
```

Type guard function, returns `true` if the given value is a valid `HttpMethod`

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

## Returns

value is "OPTIONS" \| "GET" \| "HEAD" \| "PUT" \| "POST" \| "DELETE" \| "PATCH"
