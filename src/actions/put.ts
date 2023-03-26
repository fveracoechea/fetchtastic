import { XShield } from '../core';
import { send } from './send';

export function put<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const newConfig: Config = {
    ...config,
    method: 'PUT',
  };
  return send<Type, Config>(newConfig, body);
}
