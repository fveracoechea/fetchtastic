# FetchRequestHeader

```ts
type FetchRequestHeader: 
  | "Accept"
  | "Content-Type"
  | "Authorization"
  | "User-Agent"
  | "Referer"
  | "Cache-Control"
  | "Accept-Encoding"
  | "Origin"
  | "Connection"
  | "Cookie"
  | "Pragma"
  | "If-Modified-Since";
```

Represents common request headers used in HTTP requests.
This type is a string union of common request header names.
For example:
'Accept', 'Content-Type', 'Authorization', etc.
