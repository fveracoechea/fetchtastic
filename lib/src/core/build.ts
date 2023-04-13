import { XShield, DataAssertionFn } from './xshield';
import { noop } from './internals';
import { SearchParamInput, searchParams, url, validateResponse } from '../operators';
import { request } from './request';
import { compose } from '../utils/compose';

export type DataAssertions<A, B, C, D, E, F, G> = {
  post?: DataAssertionFn<A>;
  get?: DataAssertionFn<B>;
  put?: DataAssertionFn<C>;
  delete?: DataAssertionFn<D>;
  head?: DataAssertionFn<E>;
  options?: DataAssertionFn<F>;
  patch?: DataAssertionFn<G>;
};

export function build<
  A = unknown,
  B = unknown,
  C = unknown,
  D = unknown,
  E = unknown,
  F = unknown,
  G = unknown,
>(assertions: DataAssertions<A, B, C, D, E, F, G> = {}) {
  return function <Type>(config: XShield<Type>) {
    return {
      config,
      post(body?: unknown) {
        const assertion = (assertions.post ?? noop) as DataAssertionFn<A>;
        return request(compose(config, validateResponse(assertion)), 'POST', body);
      },
      get(path = '', search: SearchParamInput = '') {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<B>;
        return request(
          compose(config, validateResponse(assertion), url(path), searchParams(search)),
          'GET',
        );
      },
      put(body?: unknown | undefined) {
        const assertion = (assertions.put ?? noop) as DataAssertionFn<C>;
        return request(compose(config, validateResponse(assertion)), 'PUT', body);
      },
      delete(body?: unknown | undefined) {
        const assertion = (assertions.delete ?? noop) as DataAssertionFn<D>;
        return request(compose(config, validateResponse(assertion)), 'DELETE', body);
      },
      head() {
        const assertion = (assertions.head ?? noop) as DataAssertionFn<E>;
        return request(compose(config, validateResponse(assertion)), 'HEAD');
      },
      options(body?: unknown | undefined) {
        const assertion = (assertions.options ?? noop) as DataAssertionFn<F>;
        return request(compose(config, validateResponse(assertion)), 'OPTIONS', body);
      },
      patch(body?: unknown | undefined) {
        const assertion = (assertions.patch ?? noop) as DataAssertionFn<G>;
        return request(compose(config, validateResponse(assertion)), 'PATCH', body);
      },
    };
  };
}
