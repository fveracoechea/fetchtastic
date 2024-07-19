import { Fetchtastic } from '../mod.ts';

describe('Search params operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ offset: 2 })
      .setSearchParams('perPage=12')
      .appendSearchParam('published', true);

    expect(config.searchParams).toBeInstanceOf(URLSearchParams);

    expect(config.searchParams.get('perPage')).toBe('12');
    expect(config.searchParams.get('offset')).toBe('2');
    expect(config.searchParams.get('published')).toBe('true');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ perPage: 12, offset: 2 })
      .appendSearchParam('first', 10)
      .setSearchParams({ published: true }, true);

    expect(config.searchParams).toBeInstanceOf(URLSearchParams);

    expect(config.searchParams.has('perPage')).toBe(false);
    expect(config.searchParams.get('perPage')).toBe(null);

    expect(config.searchParams.has('offset')).toBe(false);
    expect(config.searchParams.get('offset')).toBe(null);

    expect(config.searchParams.has('first')).toBe(false);
    expect(config.searchParams.get('first')).toBe(null);

    expect(config.searchParams.has('published')).toBe(true);
    expect(config.searchParams.get('published')).toBe('true');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ offset: 2, perPage: 12, published: true })
      .deleteSearchParam('published');

    expect(config.searchParams).toBeInstanceOf(URLSearchParams);

    expect(config.searchParams.has('perPage')).toBe(true);
    expect(config.searchParams.get('perPage')).toBe('12');

    expect(config.searchParams.has('offset')).toBe(true);
    expect(config.searchParams.get('offset')).toBe('2');

    expect(config.searchParams.has('published')).toBe(false);
    expect(config.searchParams.get('published')).toBe(null);
  });
});
