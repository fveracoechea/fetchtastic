# Fetchtastic

Represents an HTTP request configuration.
It provides methods for setting headers, URL parameters, request body, and other options.
It also provides convenience methods for performing common HTTP methods such as:
GET, POST, PUT, DELETE, OPTIONS, PATCH, and HEAD.

## Constructors

### new Fetchtastic()

```ts
new Fetchtastic(baseUrl?, controller?): Fetchtastic
```

Creates a new instance of Fetchtastic.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseUrl`? | `string` \| `URL` | The base `URL` for the requests. |
| `controller`? | `AbortController` | An optional `AbortController` instance for aborting the request. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

## Accessors

### URL

```ts
get URL(): string
```

URL of the request, including any URL parameters.

#### Returns

`string`

***

### body

```ts
get body(): unknown
```

Body of the request.
It can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams,
a string, or a ReadableStream object.
Note that a request using the GET or HEAD method cannot have a body.

#### Returns

`unknown`

***

### headers

```ts
get headers(): Headers
```

Gets the request headers.

#### Returns

`Headers`

***

### method

```ts
get method(): 
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
```

HTTP method associated with the request.

#### Returns

  \| `"OPTIONS"`
  \| `"GET"`
  \| `"HEAD"`
  \| `"PUT"`
  \| `"POST"`
  \| `"DELETE"`
  \| `"PATCH"`

***

### requestOptions

```ts
get requestOptions(): FetchtasticOptions
```

An object containing custom settings applied to the request.

#### Returns

[`FetchtasticOptions`](../type-aliases/FetchtasticOptions.md)

***

### searchParams

```ts
get searchParams(): URLSearchParams
```

Gets the URL search parameters.

#### Returns

`URLSearchParams`

## Methods

### appendHeader()

#### appendHeader(name, value)

```ts
appendHeader(name, value): this
```

Appends a header to the request, it uses `Headers.append` under the hood.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | [`FetchRequestHeader`](../type-aliases/FetchRequestHeader.md) | The name of the header. |
| `value` | `string` | The value of the header. |

##### Returns

`this`

#### appendHeader(name, value)

```ts
appendHeader(name, value): this
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `value` | `string` |

##### Returns

`this`

***

### appendSearchParam()

```ts
appendSearchParam(name, value): Fetchtastic
```

Appends a search parameter to the request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the search parameter. |
| `value` | `string` \| `number` \| `boolean` | The value of the search parameter. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### arrayBuffer()

```ts
arrayBuffer(): Promise<ArrayBuffer>
```

Sends the fetch request and returns the response as an `ArrayBuffer`.

#### Returns

`Promise`\<`ArrayBuffer`\>

***

### badRequest()

```ts
badRequest(catcher): Fetchtastic
```

Handles 400 bad-request HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### blob()

```ts
blob(): Promise<Blob>
```

Resolves the fetch request and returns the response as a `Blob`.

#### Returns

`Promise`\<`Blob`\>

***

### controller()

```ts
controller(abortController): Fetchtastic
```

Registers an abort controller, in order to cancel the request if needed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `abortController` | `AbortController` | an `AbortController` instance |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

#### Link

https://developer.mozilla.org/en-US/docs/Web/API/AbortController

***

### delete()

```ts
delete(body?, url?): Fetchtastic
```

Sets the HTTP method to DELETE and optionally sets the request URL and body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body`? | `unknown` | The body of the DELETE request. If not provided, the existing body is used. |
| `url`? | `string` | if provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated DELETE request configuration.

***

### deleteHeader()

```ts
deleteHeader(name): Fetchtastic
```

Deletes a header from the request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the header to delete. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### deleteSearchParam()

```ts
deleteSearchParam(name): Fetchtastic
```

Deletes a search parameter from the request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The name of the search parameter to delete. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### forbidden()

```ts
forbidden(catcher): Fetchtastic
```

Handles 403 forbidden HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### formData()

```ts
formData(): Promise<FormData>
```

Resolves the fetch request and returns the response as a `FormData`.

#### Returns

`Promise`\<`FormData`\>

***

### get()

```ts
get(url?): Fetchtastic
```

Sets the HTTP method to GET and optionally sets the request URL.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url`? | `string` | If provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated GET request configuration.

***

### head()

```ts
head(url?): Fetchtastic
```

Sets the HTTP method to HEAD and optionally sets the request URL.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url`? | `string` | if provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated HEAD request configuration.

***

### json()

```ts
json<T>(assertData?): Promise<T>
```

Sends the request and returns the response as a `JSON` object.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `assertData`? | [`DataAssertionFn`](../type-aliases/DataAssertionFn.md)\<`T`\> | Optional. A function to assert and transform the response data. |

#### Returns

`Promise`\<`T`\>

***

### notFound()

```ts
notFound(catcher): Fetchtastic
```

Handles 404 not-found HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### onError()

```ts
onError(status, catcher): Fetchtastic
```

Registers an given error handler for a specific status code.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | HTTP status code |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) | on-error callback function |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### options()

```ts
options(body?, url?): Fetchtastic
```

Sets the HTTP method to OPTIONS and optionally sets the request URL and body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body`? | `unknown` | The body of the OPTIONS request. If not provided, the existing body is used. |
| `url`? | `string` | if provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated OPTIONS request configuration.

***

### patch()

```ts
patch(body?, url?): Fetchtastic
```

Sets the HTTP method to PATCH and optionally sets the request URL and body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body`? | `unknown` | The body of the PATCH request. If not provided, the existing body is used. |
| `url`? | `string` | if provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated PATCH request configuration.

***

### post()

```ts
post(body?, url?): Fetchtastic
```

Sets the HTTP method to POST and optionally sets the request URL and body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body`? | `unknown` | The body of the POST request. If not provided, the existing body is used. |
| `url`? | `string` | Appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated POST request configuration.

***

### put()

```ts
put(body?, url?): Fetchtastic
```

Sets the HTTP method to PUT and optionally sets the request URL and body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body`? | `unknown` | The body of the PUT request. If not provided, the existing body is used. |
| `url`? | `string` | if provided appends to the existing URL. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

A new instance with the updated PUT request configuration.

***

### resolve()

```ts
resolve(): Promise<Response>
```

Resolves the fetch request and returns the `Response`

#### Returns

`Promise`\<`Response`\>

#### Throws

`ResponseError` if the fetch request fails.

***

### serverError()

```ts
serverError(catcher): Fetchtastic
```

Handles 500 internal-server-error HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### setBody()

```ts
setBody(body): Fetchtastic
```

Sets the body of the request.
It can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams,
a string, or a ReadableStream object.
Note that a request using the GET or HEAD method cannot have a body.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `unknown` | The body data. |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### setHeaders()

```ts
setHeaders(headers?, replace?): Fetchtastic
```

Sets the headers of the request, it uses `Headers.set` behind the scenes.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `headers`? | `HeadersInit` | `undefined` | - |
| `replace`? | `boolean` | `false` | Specifies whether to replace the existing headers (default: false). |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

#### Link

https://developer.mozilla.org/en-US/docs/Web/API/Headers/set

***

### setOptions()

```ts
setOptions(options, replace): Fetchtastic
```

Sets any custom settings that you want to apply to the request.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `options` | [`FetchtasticOptions`](../type-aliases/FetchtasticOptions.md) | `undefined` | The options to set. |
| `replace` | `boolean` | `false` | Specifies whether to replace the existing options (default: false). |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### setSearchParams()

```ts
setSearchParams(data, replace): Fetchtastic
```

Sets the search parameters for the request.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `data` | [`SearchParamInput`](../type-aliases/SearchParamInput.md) | `undefined` | The URL parameters to set. |
| `replace` | `boolean` | `false` | Specifies whether to replace the existing search parameters (default: false). |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### text()

```ts
text(): Promise<string>
```

Sends the fetch request and resolve the response as plain text.

#### Returns

`Promise`\<`string`\>

***

### timeout()

```ts
timeout(catcher): Fetchtastic
```

Handles 408 request-timeout HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### unauthorized()

```ts
unauthorized(catcher): Fetchtastic
```

Handles 401 unauthorized HTTP responses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `catcher` | [`CatcherCallback`](../type-aliases/CatcherCallback.md) |

#### Returns

[`Fetchtastic`](Fetchtastic.md)

***

### url()

#### url(url)

```ts
url(url): this
```

Sets or modifies the URL in the request configuration.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `URL` | The new URL or a string to append to the existing URL. |

##### Returns

`this`

A new instance with the updated URL configuration.

##### Example

```ts
const request = new Fetchtastic()
request.url(new URL('https://example.com'));

// Append a string to the existing URL
request.url('/path');

// Replace the existing URL with a new string
request.url('/newpath', true);
```

#### url(url, replace)

```ts
url(url, replace?): this
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `replace`? | `boolean` |

##### Returns

`this`
