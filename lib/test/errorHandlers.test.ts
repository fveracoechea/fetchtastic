import { Fetchtastic, HttpError } from '../src';

// SET UP

const fetchMock = jest.fn();
global.fetch = fetchMock;

beforeEach(() => {
  fetchMock.mockClear();
});

// VARS
const endpoint = 'https://catfact.ninja/breeds';

const headers = { accept: 'application/json' };

const data = {
  breed: 'American Bobtail',
  country: 'United States',
};

// const body = {
//   origin: 'Mutation',
//   coat: 'Short/Long',
//   pattern: 'All',
// };

const config = new Fetchtastic(endpoint).headers(headers);

test('Catchers are NOT called when response is OK', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify(data), {
        status: 200,
      }),
    ),
  );

  const catcher = jest.fn();

  config.onError(400, catcher);
  config.onError(404, catcher);
  config.onError(500, catcher);

  const result = await config.get().text();

  expect(result).toBe(JSON.stringify(data));
  expect(catcher).not.toHaveBeenCalled();
});

test('Catchers are called when response is not OK', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response('Testing Not Found', {
        status: 404,
      }),
    ),
  );

  const notFoundCatcher1 = jest.fn();
  const notFoundCatcher2 = jest.fn();
  const notFoundCatcher3 = jest.fn();
  const otherCatcher1 = jest.fn();
  const otherCatcher2 = jest.fn();

  config.onError(404, notFoundCatcher1);
  config.onError(404, notFoundCatcher2);
  config.onError(404, notFoundCatcher3);

  config.onError(400, otherCatcher1);
  config.onError(500, otherCatcher2);

  const result = await config.get().text();

  expect(result).toBe('Testing Not Found');
  expect(otherCatcher1).not.toHaveBeenCalled();
  expect(otherCatcher2).not.toHaveBeenCalled();
  expect(notFoundCatcher1).toHaveBeenCalled();
  expect(notFoundCatcher2).toHaveBeenCalled();
  expect(notFoundCatcher3).toHaveBeenCalled();
});

test('Catcher args are correct', done => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Bad Request' }), {
        status: 400,
      }),
    ),
  );

  function badRequestCatcher(error: HttpError, config: Fetchtastic) {
    expect(error).toBeInstanceOf(HttpError);
    expect(error.status).toBe(400);
    expect(error.response).toBeInstanceOf(Response);
    expect(config).toBeInstanceOf(Fetchtastic);
    done();
  }

  config.onError(400, badRequestCatcher).get().resolve();
});

test('Bad Request', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Bad Request' }), {
        status: 400,
      }),
    ),
  );

  const catcher = jest.fn();
  await config.badRequest(catcher).put().resolve();
  expect(catcher).toBeCalled();
});

test('Unauthorized', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Unauthorized' }), {
        status: 401,
      }),
    ),
  );

  const catcher = jest.fn();
  await config.unauthorized(catcher).delete().resolve();
  expect(catcher).toBeCalled();
});

test('Forbidden', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Forbidden' }), {
        status: 403,
      }),
    ),
  );

  const catcher = jest.fn();
  await config.forbidden(catcher).patch().resolve();
  expect(catcher).toBeCalled();
});

test('Not Found', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Not Found' }), {
        status: 404,
      }),
    ),
  );

  const catcher = jest.fn();
  await config.notFound(catcher).options().resolve();
  expect(catcher).toBeCalled();
});

test('Server Error', async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify({ detail: 'Server Error' }), {
        status: 500,
      }),
    ),
  );

  const catcher = jest.fn();
  await config.serverError(catcher).post().resolve();
  expect(catcher).toBeCalled();
});
