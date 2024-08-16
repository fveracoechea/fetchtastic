# API Reference

## Classes

| Class | Description |
| ------ | ------ |
| [Fetchtastic](classes/Fetchtastic.md) | Represents an HTTP request configuration. It provides methods for setting headers, URL parameters, request body, and other options. It also provides convenience methods for performing common HTTP methods such as: GET, POST, PUT, DELETE, OPTIONS, PATCH, and HEAD. |
| [ResponseError](classes/ResponseError.md) | Represents an error that occurs during an HTTP request made with Fetchtastic. It encapsulates information about the error, including the request URL, status code, response details, and error message. |

## Type Aliases

| Type alias | Description |
| ------ | ------ |
| [CatcherCallback](type-aliases/CatcherCallback.md) | Callback function used to handle fetch response errors. |
| [DataAssertionFn](type-aliases/DataAssertionFn.md) | Represents a function used to assert the type of data. This function takes an unknown data and returns a specified type. |
| [FetchRequestHeader](type-aliases/FetchRequestHeader.md) | Represents common request headers used in HTTP requests. This type is a string union of common request header names. For example: 'Accept', 'Content-Type', 'Authorization', etc. |
| [FetchtasticOptions](type-aliases/FetchtasticOptions.md) | Options for configuring the behavior of Fetchtastic. This type extends RequestInit but omits 'signal' and 'method' properties. |
| [HttpMethod](type-aliases/HttpMethod.md) | Represents an HTTP method. This type is a union of strings representing various HTTP methods. |
| [SearchParamInput](type-aliases/SearchParamInput.md) | Represents various types that can be used as search parameters in a URL. This type is a union of string, URLSearchParams, array of key-value pairs, and record of key-value pairs. |

## Variables

| Variable | Description |
| ------ | ------ |
| [HttpMethods](variables/HttpMethods.md) | HTTP methods supported by the HTTP protocol. This array contains strings representing various HTTP methods. The methods include OPTIONS, GET, HEAD, PUT, POST, DELETE, and PATCH. |
| [StatusCodes](variables/StatusCodes.md) | HTTP status codes and their corresponding descriptions. This object maps HTTP status code numbers to their standard textual descriptions. Each key represents an HTTP status code, and its corresponding value is the description. The keys are numeric values, and the values are strings. |

## Functions

| Function | Description |
| ------ | ------ |
| [fetchtastic](functions/fetchtastic.md) | Creates a new instance of Fetchtastic which represents an HTTP request configuration. |
| [isHttpMethod](functions/isHttpMethod.md) | Type guard function, returns `true` if the given value is a valid `HttpMethod` |
| [isStatusCode](functions/isStatusCode.md) | Type guard function to check if the input is a valid HTTP status code. |
