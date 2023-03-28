import * as x from '../src';

describe('Url operator', () => {
  it('Concat works', async () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const config = x.compose(
      x.initialize(),
      x.url('https://catfact.ninja'),
      x.url('/breeds'),
      x.url('/77'),
    );

    expect(config).toHaveProperty(['url'], expected);
  });

  it('Replace works', async () => {
    const expected = 'https://other.url';

    const config = x.compose(
      x.initialize(),
      x.url('https://catfact.ninja'),
      x.url('/breeds'),
      x.url('https://other.url', true),
    );

    expect(config).toHaveProperty(['url'], expected);
  });
});
