# FetchtasticOptions

```ts
type FetchtasticOptions: Omit<RequestInit, "signal" | "method" | "body" | "headers">;
```

Options for configuring the behavior of Fetchtastic.
This type extends RequestInit but omits 'signal' and 'method' properties.
