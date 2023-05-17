let status = 'pending';
let cache: unknown | null = null;
let error: Error;

export function suspender<T>(getPromise: () => Promise<T>) {
  let suspender: Promise<void> = Promise.resolve();

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

  if (status === 'pending') {
    throw suspender;
  } else if (status === 'rejected') {
    throw error;
  } else {
    return cache as T;
  }
}
