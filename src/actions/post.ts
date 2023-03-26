import { XShield } from '../core';
import { send } from './send';

export function post<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const options = body
    ? { ...config.options, body: JSON.stringify(body) }
    : config.options;

  const newConfig: Config = {
    ...config,
    method: 'POST',
    options,
  };

  return send(newConfig);
}
