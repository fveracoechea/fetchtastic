import { XShield } from './core';
import { request } from './request';

export function build<Type>(config: XShield<Type>) {
  return {
    config,
    post(body?: unknown | undefined) {
      return request<Type>(config, 'GET', body);
    },
    get() {
      return request<Type>(config, 'GET');
    },
    put(body?: unknown | undefined) {
      return request<Type>(config, 'PUT', body);
    },
    delete(body?: unknown | undefined) {
      return request<Type>(config, 'DELETE', body);
    },
    head() {
      return request<Type>(config, 'HEAD');
    },
    options(body?: unknown | undefined) {
      return request<Type>(config, 'OPTIONS', body);
    },
    patch(body?: unknown | undefined) {
      return request<Type>(config, 'PATCH', body);
    },
  };
}
