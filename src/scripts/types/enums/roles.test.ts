import { describe, it, expect } from 'vitest'
import { primitives } from '@revolutionarygamesco/common/testing'
import { isShipRole, selectRandomShipRole, shipRoles, type ShipRole } from './roles.ts'

describe('isShipRole', () => {
  it.each(primitives)('rejects %s', (_desc: string, candidate: any) => {
    expect(isShipRole(candidate)).toBe(false)
  })

  it.each(shipRoles)('accepts %s', (role: ShipRole) => {
    expect(isShipRole(role)).toBe(true)
  })
})

describe('selectRandomShipRole', () => {
  it('picks a ship role', () => {
    expect(shipRoles).toContain(selectRandomShipRole())
  })
})
