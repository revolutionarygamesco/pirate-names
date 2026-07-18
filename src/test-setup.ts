import { vi } from 'vitest'

(global as any).game = {
  settings: {
    register: vi.fn(),
    get: vi.fn(),
    set: vi.fn()
  },
  user: {
    isGM: true
  }
};

(global as any).ui = {
  notifications: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
};

(global as any).Hooks = {
  once: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  call: vi.fn(),
  callAll: vi.fn()
};

(global as any).CONFIG = {};

(global as any).foundry = {
  utils: {
    mergeObject: vi.fn()
  }
};
