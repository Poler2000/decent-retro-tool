import { beforeAll } from 'vitest';

beforeAll(() => {
  // @ts-expect-error setting global for React 19 testing environment
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});
