import { useEffect } from 'react';
import { postsApi } from '../utils/postApi';

let status = 'pending';
let cache: any = null;
let error: Error;

function suspender<T>(getPromise: () => Promise<T>) {
  let result: T;
  let suspender: Promise<any>;

  if (status === 'pending') {
    suspender = getPromise()
      .then(r => {
        status = 'fulfilled';
        cache = r;
      })
      .catch(e => {
        status = 'rejected';
        error = e;
      });
  }

  if (cache) {
    result = cache;
  }

  if (status === 'pending') {
    throw suspender!;
  } else if (status === 'rejected') {
    throw error!;
  } else {
    return result!;
  }
}

export default function Posts() {
  const result = suspender(() => postsApi.get());

  return (
    <div>
      <h2>Posts</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
