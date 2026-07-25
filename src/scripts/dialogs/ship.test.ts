import { beforeEach, describe, expect, it, vi, type Mock, afterEach } from 'vitest'
import { mockChatMessage, mockUser } from '@revolutionarygamesco/common-foundryvtt/mocks'
import * as colors from '../types/enums/colors.ts'
import * as roles from '../types/enums/roles.ts'
import Ship from '../classes/ship.ts'
import { defaultOnComplete } from './ship.ts'

describe('Ship Dialog defaultOnComplete', () => {
  let spy: Mock
  let create: Mock

  beforeEach(() => {
    mockUser({ id: 'user-1' })
    create = mockChatMessage()
    spy = vi.spyOn(Ship, 'generate')
  })

  afterEach(() => {
    spy.mockRestore()
    create.mockRestore()
  })

  it('passes valid colors, role through', async () => {
    await defaultOnComplete('British', 'Merchantman')
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ colors: 'British', role: 'Merchantman' }))
  })

  it('selects random colors when the string is not valid', async () => {
    const random = vi.spyOn(colors, 'selectRandomColors').mockResolvedValue('Dutch')
    await defaultOnComplete('Random', 'Merchantman')
    expect(random).toHaveBeenCalled()
    random.mockRestore()
  })

  it('selects random role when the string is not valid', async () => {
    const random = vi.spyOn(roles, 'selectRandomShipRole').mockReturnValue('Man-of-War')
    await defaultOnComplete('British', 'Random')
    expect(random).toHaveBeenCalled()
    random.mockRestore()
  })

  it('whispers to the current user', async () => {
    await defaultOnComplete('British', 'Merchantman')
    expect(create.mock.calls[0]![0].whisper).toEqual(['user-1'])
  })
})
