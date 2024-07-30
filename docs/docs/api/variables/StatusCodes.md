# StatusCodes

```ts
const StatusCodes: Readonly<object>;
```

HTTP status codes and their corresponding descriptions.
This object maps HTTP status code numbers to their standard textual descriptions.
Each key represents an HTTP status code, and its corresponding value is the description.
The keys are numeric values, and the values are strings.

```ts
const statusText = StatusCodes[501];
console.log(description); // 'Not Implemented'
```

## Type declaration

### 100

```ts
readonly 100: "Continue" = 'Continue';
```

### 101

```ts
readonly 101: "Switching Protocols" = 'Switching Protocols';
```

### 102

```ts
readonly 102: "Processing" = 'Processing';
```

### 103

```ts
readonly 103: "Early Hints" = 'Early Hints';
```

### 200

```ts
readonly 200: "OK" = 'OK';
```

### 201

```ts
readonly 201: "Created" = 'Created';
```

### 202

```ts
readonly 202: "Accepted" = 'Accepted';
```

### 203

```ts
readonly 203: "Non-Authoritative Information" = 'Non-Authoritative Information';
```

### 204

```ts
readonly 204: "No Content" = 'No Content';
```

### 205

```ts
readonly 205: "Reset Content" = 'Reset Content';
```

### 206

```ts
readonly 206: "Partial Content" = 'Partial Content';
```

### 207

```ts
readonly 207: "Multi-Status" = 'Multi-Status';
```

### 208

```ts
readonly 208: "Already Reported" = 'Already Reported';
```

### 226

```ts
readonly 226: "IM Used" = 'IM Used';
```

### 300

```ts
readonly 300: "Multiple Choices" = 'Multiple Choices';
```

### 301

```ts
readonly 301: "Moved Permanently" = 'Moved Permanently';
```

### 302

```ts
readonly 302: "Found" = 'Found';
```

### 303

```ts
readonly 303: "See Other" = 'See Other';
```

### 304

```ts
readonly 304: "Not Modified" = 'Not Modified';
```

### 305

```ts
readonly 305: "Use Proxy" = 'Use Proxy';
```

### 307

```ts
readonly 307: "Temporary Redirect" = 'Temporary Redirect';
```

### 308

```ts
readonly 308: "Permanent Redirect" = 'Permanent Redirect';
```

### 400

```ts
readonly 400: "Bad Request" = 'Bad Request';
```

### 401

```ts
readonly 401: "Unauthorized" = 'Unauthorized';
```

### 402

```ts
readonly 402: "Payment Required" = 'Payment Required';
```

### 403

```ts
readonly 403: "Forbidden" = 'Forbidden';
```

### 404

```ts
readonly 404: "Not Found" = 'Not Found';
```

### 405

```ts
readonly 405: "Method Not Allowed" = 'Method Not Allowed';
```

### 406

```ts
readonly 406: "Not Acceptable" = 'Not Acceptable';
```

### 407

```ts
readonly 407: "Proxy Authentication Required" = 'Proxy Authentication Required';
```

### 408

```ts
readonly 408: "Request Timeout" = 'Request Timeout';
```

### 409

```ts
readonly 409: "Conflict" = 'Conflict';
```

### 410

```ts
readonly 410: "Gone" = 'Gone';
```

### 411

```ts
readonly 411: "Length Required" = 'Length Required';
```

### 412

```ts
readonly 412: "Precondition Failed" = 'Precondition Failed';
```

### 413

```ts
readonly 413: "Payload Too Large" = 'Payload Too Large';
```

### 414

```ts
readonly 414: "URI Too Long" = 'URI Too Long';
```

### 415

```ts
readonly 415: "Unsupported Media Type" = 'Unsupported Media Type';
```

### 416

```ts
readonly 416: "Range Not Satisfiable" = 'Range Not Satisfiable';
```

### 417

```ts
readonly 417: "Expectation Failed" = 'Expectation Failed';
```

### 418

```ts
readonly 418: "I'm a Teapot" = "I'm a Teapot";
```

### 421

```ts
readonly 421: "Misdirected Request" = 'Misdirected Request';
```

### 422

```ts
readonly 422: "Unprocessable Entity" = 'Unprocessable Entity';
```

### 423

```ts
readonly 423: "Locked" = 'Locked';
```

### 424

```ts
readonly 424: "Failed Dependency" = 'Failed Dependency';
```

### 425

```ts
readonly 425: "Too Early" = 'Too Early';
```

### 426

```ts
readonly 426: "Upgrade Required" = 'Upgrade Required';
```

### 428

```ts
readonly 428: "Precondition Required" = 'Precondition Required';
```

### 429

```ts
readonly 429: "Too Many Requests" = 'Too Many Requests';
```

### 431

```ts
readonly 431: "Request Header Fields Too Large" = 'Request Header Fields Too Large';
```

### 451

```ts
readonly 451: "Unavailable For Legal Reasons" = 'Unavailable For Legal Reasons';
```

### 500

```ts
readonly 500: "Internal Server Error" = 'Internal Server Error';
```

### 501

```ts
readonly 501: "Not Implemented" = 'Not Implemented';
```

### 502

```ts
readonly 502: "Bad Gateway" = 'Bad Gateway';
```

### 503

```ts
readonly 503: "Service Unavailable" = 'Service Unavailable';
```

### 504

```ts
readonly 504: "Gateway Timeout" = 'Gateway Timeout';
```

### 505

```ts
readonly 505: "HTTP Version Not Supported" = 'HTTP Version Not Supported';
```

### 506

```ts
readonly 506: "Variant Also Negotiates" = 'Variant Also Negotiates';
```

### 507

```ts
readonly 507: "Insufficient Storage" = 'Insufficient Storage';
```

### 508

```ts
readonly 508: "Loop Detected" = 'Loop Detected';
```

### 509

```ts
readonly 509: "Bandwidth Limit Exceeded" = 'Bandwidth Limit Exceeded';
```

### 510

```ts
readonly 510: "Not Extended" = 'Not Extended';
```

### 511

```ts
readonly 511: "Network Authentication Required" = 'Network Authentication Required';
```
