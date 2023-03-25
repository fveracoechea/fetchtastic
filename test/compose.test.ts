import * as x from '../src';

describe('Compose operator', () => {
  it('Calls all operators', async () => {
    const config = x.initialize();
    const mockOperator = jest.fn(() => config);
    // 1 call
    const a = x.compose(config, mockOperator);
    // 3 calls
    const b = x.compose(a, mockOperator, mockOperator, mockOperator);
    // 5 calls
    x.compose(
      b,
      mockOperator,
      mockOperator,
      mockOperator,
      mockOperator,
      mockOperator,
    );

    expect(mockOperator).toBeCalledTimes(9);
  });

  it('Pipes all values', async () => {
    const config = x.initialize();

    const mockOperator1 = jest.fn((c: x.XShield) => {
      c.options = { cache: 'default' };
      return c;
    });

    const mockOperator2 = jest.fn((c: x.XShield) => {
      c.url = '/testing';
      return c;
    });

    const mockOperator3 = jest.fn((c: x.XShield) => {
      c.options = { cache: 'no-cache' };
      return c;
    });

    const xshield = x.compose(
      config,
      mockOperator1,
      mockOperator2,
      mockOperator3,
    );

    expect(xshield).toHaveProperty(['url'], '/testing');
    expect(xshield).toHaveProperty(['options', 'cache'], 'no-cache');
  });

  it('Immutability and Composability work', async () => {
    const api = x.compose(
      x.initialize(),
      x.headers({ Accept: 'application/json' }),
      x.url('https://catfact.ninja'),
      x.headers({ 'Content-Type': 'application/text' }),
      x.validateResponse(data => data as { test: string }),
    );

    const breedsApi = x.compose(
      api,
      x.url('/breeds'),
      x.headers({ 'Content-Type': 'application/json' }),
    );

    const factsApi = x.compose(
      api,
      x.url('/facts'),
      x.headers({ 'Accept-Language': 'en-US,en;q=0.5' }),
    );

    // breeds
    expect(breedsApi).toHaveProperty(['url'], 'https://catfact.ninja/breeds');
    expect(breedsApi.headers.get('Accept')).toBe('application/json');
    expect(breedsApi.headers.get('Content-Type')).toBe('application/json');
    // fatcs
    expect(factsApi).toHaveProperty(['url'], 'https://catfact.ninja/facts');
    expect(factsApi.headers.get('Accept')).toBe('application/json');
    expect(factsApi.headers.get('Content-Type')).toBe('application/text');
    expect(factsApi.headers.get('Accept-Language')).toBe('en-US,en;q=0.5');
  });
});
