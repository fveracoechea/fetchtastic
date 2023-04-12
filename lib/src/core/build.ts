import { XShield, DataAssertionFn } from './xshield';
import { noop } from './internals';
import { url, validateResponse } from '../operators';
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

export function build<Type>(config: XShield<Type>) {
  return {
    config,
    post(body?: unknown | undefined) {
      return request(config, 'POST', body);
    },
    get() {
      return request(config, 'GET');
    },
    put(body?: unknown | undefined) {
      return request(config, 'PUT', body);
    },
    delete(body?: unknown | undefined) {
      return request(config, 'DELETE', body);
    },
    head() {
      return request(config, 'HEAD');
    },
    options(body?: unknown | undefined) {
      return request(config, 'OPTIONS', body);
    },
    patch(body?: unknown | undefined) {
      return request(config, 'PATCH', body);
    },
  };
}

export function buildWithAssertions<
  A = unknown,
  B = unknown,
  C = unknown,
  D = unknown,
  E = unknown,
  F = unknown,
  G = unknown,
>(assertions: DataAssertions<A, B, C, D, E, F, G>) {
  return function <Type>(config: XShield<Type>) {
    return {
      config,
      post(body?: unknown | undefined) {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<A>;
        return request(compose(config, validateResponse(assertion)), 'POST', body);
      },
      get(path = '') {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<B>;
        return request(compose(config, validateResponse(assertion), url(path)), 'GET');
      },
      put(body?: unknown | undefined) {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<C>;
        return request(compose(config, validateResponse(assertion)), 'PUT', body);
      },
      delete(body?: unknown | undefined) {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<D>;
        return request(compose(config, validateResponse(assertion)), 'DELETE', body);
      },
      head() {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<E>;
        return request(compose(config, validateResponse(assertion)), 'HEAD');
      },
      options(body?: unknown | undefined) {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<F>;
        return request(compose(config, validateResponse(assertion)), 'OPTIONS', body);
      },
      patch(body?: unknown | undefined) {
        const assertion = (assertions.get ?? noop) as DataAssertionFn<G>;
        return request(compose(config, validateResponse(assertion)), 'PATCH', body);
      },
    };
  };
}
