import { XShield } from '../core';
import { send } from './send';

export function head<Type, Config extends XShield<Type>>(config: Config) {
  const newConfig: Config = {
    ...config,
    method: 'HEAD',
  };
  return send<Type, Config>(newConfig);
}
