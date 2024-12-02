import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Extend Vitest with jest-dom matchers
expect.extend(await import('@testing-library/jest-dom/matchers'))

// Make vi available globally
globalThis.vi = vi

// Cleanup after each test
afterEach(() => {
  cleanup()
})
