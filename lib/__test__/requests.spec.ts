import { Fetchtastic, ResponseError } from '../mod.ts';

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
const headers = {
  'content-type': 'application/json',
  accept: 'application/json',
};
const body = {
  breed: 'American Bobtail',
  country: 'United States',
  origin: 'Mutation',
  coat: 'Short/Long',
  pattern: 'All',
};

const getConfig = new Fetchtastic(endpoint).setHeaders(headers);
const postConfig = getConfig.setBody(body);

beforeEach(() => {
  fetchMock.mockClear();
});

describe('GET Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(JSON.stringify(data), {
          status: 200,
        }),
      ),
    );

    // checks the response
    expect(getConfig.get().json()).resolves.toMatchObject(data);

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'GET',
      body: null,
      headers: new Headers(headers),
    });
  });

  it('Rejects 404', async () => {
    // simulates a 404 server response
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 404,
        }),
      ),
    );
    // checks the response
    expect(getConfig.get().json()).rejects.toBeInstanceOf(ResponseError);

    await getConfig
      .get()
      .json()
      .catch((error: ResponseError) => {
        expect(error.method).toBe('GET');
        expect(error.response.status).toBe(404);
        expect(error.response.url).toBe('');
        expect(error.message).toBe('Not Found');
      });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'GET',
      body: null,
      headers: new Headers(headers),
    });
  });

  test('Fetch Error', () => {
    // simulates fetch failure
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch')),
    );
    // checks the response
    expect(getConfig.get().json()).rejects.toBeInstanceOf(Error);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'GET',
      body: null,
      headers: new Headers(headers),
    });
  });
});

describe('POST Requests', () => {
  test('Fulfilling', () => {
    // simulates a successful server response
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify(data), {
          status: 200,
        }),
      ),
    );

    // checks the response
    expect(postConfig.post().json()).resolves.toMatchObject(data);
    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers(headers),
    });
  });

  test('Rejecting with 404', async () => {
    // simulates a 404 server response
    fetchMock.mockImplementation(() =>
      Promise.resolve(
        new Response(null, {
          status: 404,
        }),
      ),
    );

    // checks the response
    expect(postConfig.post().json()).rejects.toBeInstanceOf(ResponseError);

    await postConfig
      .post()
      .json()
      .catch((error: ResponseError) => {
        expect(error.method).toBe('POST');
        expect(error.response.status).toBe(404);
        expect(error.response.url).toBe('');
        expect(error.message).toBe('Not Found');
      });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers(headers),
    });
  });

  test('Fetch Error', async () => {
    // simulates fetch failure
    fetchMock.mockImplementation(() =>
      Promise.reject(new Error('Failed to fetch')),
    );
    // checks the response
    expect(postConfig.post().json()).rejects.toBeInstanceOf(Error);

    await postConfig
      .post()
      .json()
      .catch((error: Error) => {
        expect(error.message).toBe('Failed to fetch');
      });

    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      ...getConfig.requestOptions,
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers(headers),
    });
  });
});
