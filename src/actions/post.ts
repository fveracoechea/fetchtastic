import { XShield } from '../core';
import { send } from './send';

export function post<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const newConfig: Config = {
    ...config,
    method: 'POST',
  };
  return send<Type, Config>(newConfig, body);
}
