import { isHttpMethod, isStatusCode } from '../mod.ts';

describe('Utility functions', () => {
  test('isHttpMethod', () => {
    expect(isHttpMethod('GET')).toBe(true);
    expect(isHttpMethod('PUT')).toBe(true);
    expect(isHttpMethod('OPTIONS')).toBe(true);
    expect(isHttpMethod('put')).toBe(true);
    expect(isHttpMethod('delete')).toBe(true);

    expect(isHttpMethod('GETx')).toBe(false);
    expect(isHttpMethod(2)).toBe(false);
    expect(isHttpMethod('')).toBe(false);
    expect(isHttpMethod('put')).toBe(false);
    expect(isHttpMethod('asdfsadf')).toBe(false);
  });

  test('isStatusCode', () => {
    expect(isStatusCode(100)).toBe(true);
    expect(isStatusCode(400)).toBe(true);
    expect(isStatusCode(404)).toBe(true);
    expect(isStatusCode(500)).toBe(true);
    expect(isStatusCode(501)).toBe(true);
    expect(isStatusCode(200)).toBe(true);

    expect(isStatusCode(1000)).toBe(false);
    expect(isStatusCode(0)).toBe(false);
    expect(isStatusCode(null)).toBe(false);
    expect(isStatusCode('500')).toBe(false);
    expect(isStatusCode(5000)).toBe(false);
    expect(isStatusCode(21)).toBe(false);
  });
});
