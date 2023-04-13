import * as x from '../src';

const fetchMock = jest.fn();
global.fetch = fetchMock;

const data = {
  current_page: 1,
  data: [
    {
      breed: 'Abyssinian',
      country: 'Ethiopia',
      origin: 'Natural/Standard',
      coat: 'Short',
      pattern: 'Ticked',
    },
    {
      breed: 'Aegean',
      country: 'Greece',
      origin: 'Natural/Standard',
      coat: 'Semi-long',
      pattern: 'Bi- or tri-colored',
    },
    {
      breed: 'American Curl',
      country: 'United States',
      origin: 'Mutation',
      coat: 'Short/Long',
      pattern: 'All',
    },
  ],
  per_page: 3,
  total: 98,
};

const endpoint = 'https://catfact.ninja/breeds';
const headers = { Accept: 'application/json' };
const body = {
  breed: 'American Bobtail',
  country: 'United States',
  origin: 'Mutation',
  coat: 'Short/Long',
  pattern: 'All',
};

const api = x.compose(x.initialize(), x.url(endpoint), x.headers(headers), x.build());

beforeEach(() => {
  fetchMock.mockClear();
});

describe('GET Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    // checks the response
    expect(api.get()).resolves.toBe(data);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
      body: null,
    });
  });

  test('Rejecting with 404', () => {
    // simulates a 404 server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );
    // checks the response
    expect(api.get()).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 404,
      method: 'GET',
      url: endpoint,
      message: 'Not Found',
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
      body: null,
    });
  });

  test('Fetch Error', () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

    // checks the response
    expect(api.get()).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 0,
      method: 'GET',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: new Headers(headers),
      body: null,
    });
  });
});

describe('POST Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(data),
      }),
    );

    // checks the response
    expect(api.post(body)).resolves.toBe(data);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
  });

  test('Rejecting with 404', () => {
    // simulates a 404 server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        ok: false,
        json: () => Promise.resolve(null),
      }),
    );

    // checks the response
    expect(api.post(body)).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 404,
      method: 'POST',
      url: endpoint,
      message: 'Not Found',
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
  });

  test('Fetch Error', () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

    // checks the response
    expect(api.post()).rejects.toMatchObject({
      _type: 'XShieldError',
      status: 0,
      method: 'POST',
      url: endpoint,
      message: 'Failed to fetch',
      response: undefined,
    });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: new Headers(headers),
      body: null,
    });
  });
});
