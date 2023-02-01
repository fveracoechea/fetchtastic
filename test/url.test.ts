import * as x from '../src';

describe('Url operator', () => {
  it('Concat works', async () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const xshield = x.compose(
      x.url('https://catfact.ninja'),
      x.url('/breeds'),
      x.url('/77'),
    );

    expect(xshield()).toHaveProperty(['url'], expected);
  });

  it('Replace works', async () => {
    const expected = 'https://other.url';

    const xshield = x.compose(
      x.url('https://catfact.ninja'),
      x.url('/breeds'),
      x.url('https://other.url', true),
    );

    expect(xshield()).toHaveProperty(['url'], expected);
  });
});
