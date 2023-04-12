import { x } from 'xshield';

type Post = {
  title: string;
  body: string;
  id: number;
};

function isPost(v: unknown): v is Post {
  return (
    v != null &&
    typeof v === 'object' &&
    'title' in v &&
    typeof v.title === 'string' &&
    'body' in v &&
    typeof v.body === 'string'
  );
}

function assertResponse(res: unknown): asserts res is Post[] {
  if (!(res != null && Array.isArray(res) && res.every(isPost))) {
    throw new Error('Invalid object');
  }
}

export const controller = new AbortController();

export const postsApi = x.compose(
  x.initialize(),
  x.url('https://jsonplaceholder.typicode.com/posts'),
  x.headers({ Accept: 'application/json' }),
  x.signal(controller.signal),
  x.build({
    get(res) {
      assertResponse(res);
      return res;
    },
    post(res) {
      if (!isPost(res)) {
        throw new Error('Invalid object');
      }
      return res;
    },
  }),
);
