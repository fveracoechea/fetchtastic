import { Fetchtastic } from '../src';

describe('Search params operator', () => {
  it('Concats', async () => {
    const config = new Fetchtastic()
      .searchParams({ offset: 2 })
      .searchParams('perPage=12')
      .appendSearchParam('published', true);

    expect(config.jsonSearchParams).toHaveProperty('perPage', '12');
    expect(config.jsonSearchParams).toHaveProperty('offset', '2');
    expect(config.jsonSearchParams).toHaveProperty('published', 'true');
  });

  it('Replaces', async () => {
    const config = new Fetchtastic()
      .searchParams({ perPage: 12, offset: 2 })
      .appendSearchParam('first', 10)
      .searchParams({ published: true }, true);

    expect(config.jsonSearchParams).not.toHaveProperty('perPage');
    expect(config.jsonSearchParams).not.toHaveProperty('offset');
    expect(config.jsonSearchParams).not.toHaveProperty('first');

    expect(config.jsonSearchParams).toHaveProperty('published', 'true');
  });

  it('Removes', async () => {
    const config = new Fetchtastic()
      .searchParams({ offset: 2, perPage: 12, published: true })
      .deleteSearchParam('published');

    expect(config.jsonSearchParams).toHaveProperty('perPage', '12');
    expect(config.jsonSearchParams).toHaveProperty('offset', '2');

    expect(config.jsonSearchParams).not.toHaveProperty('published');
  });
});
