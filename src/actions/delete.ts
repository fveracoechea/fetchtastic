import { XShield } from '../core';
import { send } from './send';

export function _delete<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const newConfig: Config = {
    ...config,
    method: 'DELETE',
  };
  return send<Type, Config>(newConfig, body);
}
