import { Fetchtastic } from '../src';

describe('Search params operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ offset: 2 })
      .setSearchParams('perPage=12')
      .appendSearchParam('published', true);

    expect(config.searchParams).toHaveProperty('perPage', '12');
    expect(config.searchParams).toHaveProperty('offset', '2');
    expect(config.searchParams).toHaveProperty('published', 'true');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ perPage: 12, offset: 2 })
      .appendSearchParam('first', 10)
      .setSearchParams({ published: true }, true);

    expect(config.searchParams).not.toHaveProperty('perPage');
    expect(config.searchParams).not.toHaveProperty('offset');
    expect(config.searchParams).not.toHaveProperty('first');

    expect(config.searchParams).toHaveProperty('published', 'true');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .setSearchParams({ offset: 2, perPage: 12, published: true })
      .deleteSearchParam('published');

    expect(config.searchParams).toHaveProperty('perPage', '12');
    expect(config.searchParams).toHaveProperty('offset', '2');

    expect(config.searchParams).not.toHaveProperty('published');
  });
});
