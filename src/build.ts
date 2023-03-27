import { XShield } from './core';
import { request } from './request';

export function build<Type, Config extends XShield<Type>>(config: Config) {
  return {
    config,
    post(body?: unknown | undefined) {
      return request<Type, Config>(config, 'GET', body);
    },
    get() {
      return request<Type, Config>(config, 'GET');
    },
    put(body?: unknown | undefined) {
      return request<Type, Config>(config, 'PUT', body);
    },
    delete(body?: unknown | undefined) {
      return request<Type, Config>(config, 'DELETE', body);
    },
    head() {
      return request<Type, Config>(config, 'HEAD');
    },
    options(body?: unknown | undefined) {
      return request<Type, Config>(config, 'OPTIONS', body);
    },
    patch(body?: unknown | undefined) {
      return request<Type, Config>(config, 'PATCH', body);
    },
  };
}
