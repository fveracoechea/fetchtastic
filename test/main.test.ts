// import * as x from '../src';
// import { z } from 'zod';

// const Breed = z.object({
//   breed: z.string(),
//   country: z.string(),
//   origin: z.string(),
//   coat: z.string(),
//   pattern: z.string(),
// });

// const BreedsResponse = z.object({
//   data: z.array(Breed),
// });

describe('blah', () => {
  it('works', async () => {
    // const catsAPI = x.compose(
    //   x.url('https://catfact.ninja'),
    //   x.url('/breeds'),
    //   x.url('replaced', true),
    // );
    // console.log(catsAPI());
    // const catsAPI = x.compose(
    //   x.url('https://catfact.ninja'),
    //   x.auth('Bearer token'),
    //   x.headers({
    //     Accept: 'application/json',
    //   }),
    // );
    // const breedsEndpoint = x.compose(
    //   catsAPI,
    //   x.options({
    //     credentials: 'include',
    //     cache: 'no-cache',
    //     mode: 'cors',
    //   }),
    // );
    // const getBreeds = (page: number) =>
    //   x.from(breedsEndpoint)(
    //     x.query({ page }),
    //     x.onNotFound(error => {}),
    //     x.onUnauthorized(error => {}),
    //     x.onError(418, error => {}),
    //     x.get(),
    //   );
    // const breeds = await getBreeds();
  });
});
