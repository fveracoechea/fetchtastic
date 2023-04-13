import { XShield } from '../core/xshield';
import { assertsXShield } from '../core/internals';

export function signal(signal: AbortSignal | null) {
  return <T>(config: XShield<T>): XShield<T> => {
    assertsXShield(config);
    return {
      ...config,
      options: {
        ...config.options,
        signal,
      },
    };
  };
}
