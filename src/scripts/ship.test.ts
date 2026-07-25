import { describe, expect, it, vi, type Mock } from 'vitest'
import { mockChatMessage } from '@revolutionarygamesco/common-foundryvtt/mocks'
import Ship from './classes/ship.ts'
import generateShipName from './ship.ts'

const payload = (create: Mock) => create.mock.calls[0]![0]

describe('generateShipName', () => {
  it('returns the ship', async () => {
    const create = mockChatMessage()
    const ship = await generateShipName({ colors: 'British', role: 'Merchantman' })
    expect(ship).toBeInstanceOf(Ship)
    expect(create).not.toHaveBeenCalled()
  })

  it('whispers to the given recipients', async () => {
    const create = mockChatMessage()
    await generateShipName({ colors: 'British', role: 'Merchantman' }, ['user-1'])
    expect(payload(create).whisper).toEqual(['user-1'])
  })

  it('passes params straight through to Ship.generate', async () => {
    const spy = vi.spyOn(Ship, 'generate')
    await generateShipName({ colors: 'Dutch' })
    expect(spy).toHaveBeenCalledWith({ colors: 'Dutch' })
    spy.mockRestore()
  })
})
