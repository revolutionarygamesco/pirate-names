import { describe, it, expect } from 'vitest'
import separateParenthetical from './parenthetical.ts'

describe('separateParenthetical', () => {
  it('separates the regular text from the parenthetical text', () => {
    const { regular, parenthetical } = separateParenthetical('Hello (world)')
    expect(regular).toBe('Hello')
    expect(parenthetical).toBe('world')
  })
})
