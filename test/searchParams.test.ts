import * as x from '../src';

describe('Search params operator', () => {
  it('Concat works', async () => {
    const pagination = x.compose(
      x.initialize(),
      x.searchParams({ offset: 2 }),
      x.searchParams('perPage=12'),
    );

    const config = x.compose(pagination, x.searchParams({ published: true }));

    expect(config.searchParams.has('perPage')).toBe(true);
    expect(config.searchParams.get('perPage')).toBe('12');

    expect(config.searchParams.has('offset')).toBe(true);
    expect(config.searchParams.get('offset')).toBe('2');

    expect(config.searchParams.has('published')).toBe(true);
    expect(config.searchParams.get('published')).toBe('true');
  });

  it('Replace works', async () => {
    const pagination = x.compose(
      x.initialize(),
      x.searchParams({ perPage: 12, offset: 2 }),
    );

    const config = x.compose(
      pagination,
      x.searchParams({ published: true }, true),
    );

    expect(config.searchParams.has('perPage')).toBe(false);
    expect(config.searchParams.get('perPage')).toBe(null);

    expect(config.searchParams.has('offset')).toBe(false);
    expect(config.searchParams.get('offset')).toBe(null);

    expect(config.searchParams.has('published')).toBe(true);
    expect(config.searchParams.get('published')).toBe('true');
  });
});
