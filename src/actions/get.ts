import { XShield } from '../core';
import { send } from './send';

export function get<Type, Config extends XShield<Type>>(config: Config) {
  const newConfig: Config = {
    ...config,
    method: 'GET',
  };
  return send<Type, Config>(newConfig);
}
