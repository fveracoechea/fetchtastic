import { XShield } from '../core';
import { send } from './send';

export function patch<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const newConfig: Config = {
    ...config,
    method: 'PATCH',
  };
  return send<Type, Config>(newConfig, body);
}
