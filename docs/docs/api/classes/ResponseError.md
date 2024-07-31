# ResponseError

Represents an error that occurs during an HTTP request made with Fetchtastic.
It encapsulates information about the error,
including the request URL, status code, response details, and error message.

## Extends

- `Error`

## Constructors

### new ResponseError()

```ts
new ResponseError(response, method): ResponseError
```

Creates a new instance of the `HttpError` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `response` | `Response` | The `Response` object received from the failed request. |
| `method` | \| `"OPTIONS"` \| `"GET"` \| `"HEAD"` \| `"PUT"` \| `"POST"` \| `"DELETE"` \| `"PATCH"` | The HTTP method used in the failed request. |

#### Returns

[`ResponseError`](ResponseError.md)

#### Overrides

`Error.constructor`

## Properties

### cause?

```ts
optional cause: unknown;
```

#### Inherited from

`Error.cause`

***

### message

```ts
message: string;
```

#### Inherited from

`Error.message`

***

### method

```ts
method: 
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH";
```

Indicates the HTTP method used in the failed request.

***

### name

```ts
name: string;
```

#### Inherited from

`Error.name`

***

### response

```ts
response: Response;
```

Refers to the `Response` object received from the failed request.

***

### stack?

```ts
optional stack: string;
```

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

```ts
static optional prepareStackTrace: (err, stackTraces) => any;
```

Optional override for formatting stack traces

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

```ts
static captureStackTrace(targetObject, constructorOpt?): void
```

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt`? | `Function` |

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
