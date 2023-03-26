import { XShield } from '../core';
import { send } from './send';

export function options<Type, Config extends XShield<Type>>(
  config: Config,
  body?: unknown | undefined,
) {
  const newConfig: Config = {
    ...config,
    method: 'OPTIONS',
    options,
  };
  return send<Type, Config>(newConfig, body);
}
