import { XShield } from '../core';
import { sendRequest } from './sendRequest';

export function build<Type, Config extends XShield<Type>>(config: Config) {
  return {
    post(body?: unknown | undefined) {
      return sendRequest<Type, Config>(config, 'GET', body);
    },
    get() {
      return sendRequest<Type, Config>(config, 'GET');
    },
    put(body?: unknown | undefined) {
      return sendRequest<Type, Config>(config, 'PUT', body);
    },
    delete(body?: unknown | undefined) {
      return sendRequest<Type, Config>(config, 'DELETE', body);
    },
    head() {
      return sendRequest<Type, Config>(config, 'HEAD');
    },
    options(body?: unknown | undefined) {
      return sendRequest<Type, Config>(config, 'OPTIONS', body);
    },
    patch(body?: unknown | undefined) {
      return sendRequest<Type, Config>(config, 'PATCH', body);
    },
  };
}
