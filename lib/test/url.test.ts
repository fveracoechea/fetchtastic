import { Fetchtastic } from '../src';

describe('Url operator', () => {
  it('Concats', () => {
    const expected = 'https://catfact.ninja/breeds/77';

    const config = new Fetchtastic('https://catfact.ninja')
      .setUrl('/breeds')
      .setUrl('/77');

    expect(config.url).toBe(expected);
  });

  it('Replaces', () => {
    const expected = 'https://other.url/test';

    const config = new Fetchtastic('https://catfact.ninja')
      .setUrl('/breeds')
      .setUrl('https://other.url', true)
      .setUrl('/test');

    expect(config.url).toBe(expected);
  });

  it('Includes search params', () => {
    const expected = 'https://catfact.ninja/breeds?perPage=12&offset=2&first=10';

    const config = new Fetchtastic('https://catfact.ninja')
      .setSearchParams({ perPage: 12, offset: 2 })
      .setUrl('/breeds')
      .appendSearchParam('first', 10);

    expect(config.url).toBe(expected);
  });
});
