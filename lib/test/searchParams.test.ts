import { Fetchtastic } from '../mod.ts';

describe('Search params operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .searchParams({ offset: 2 })
      .searchParams('perPage=12')
      .appendSearchParam('published', true);

    expect(config.searchParamsJSON).toHaveProperty('perPage', '12');
    expect(config.searchParamsJSON).toHaveProperty('offset', '2');
    expect(config.searchParamsJSON).toHaveProperty('published', 'true');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .searchParams({ perPage: 12, offset: 2 })
      .appendSearchParam('first', 10)
      .searchParams({ published: true }, true);

    expect(config.searchParamsJSON).not.toHaveProperty('perPage');
    expect(config.searchParamsJSON).not.toHaveProperty('offset');
    expect(config.searchParamsJSON).not.toHaveProperty('first');

    expect(config.searchParamsJSON).toHaveProperty('published', 'true');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .searchParams({ offset: 2, perPage: 12, published: true })
      .deleteSearchParam('published');

    expect(config.searchParamsJSON).toHaveProperty('perPage', '12');
    expect(config.searchParamsJSON).toHaveProperty('offset', '2');

    expect(config.searchParamsJSON).not.toHaveProperty('published');
  });
});
