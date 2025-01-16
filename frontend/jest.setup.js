import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

// Define matchMedia property only once and make it writable
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock IntersectionObserver globally
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
};

// Add custom matcher for contains text
expect.extend({
  toContainText(received, text) {
    const pass = received.textContent.includes(text);
    if (pass) {
      return {
        message: () => `expected ${received} not to contain text ${text}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to contain text ${text}`,
        pass: false,
      };
    }
  },
});

