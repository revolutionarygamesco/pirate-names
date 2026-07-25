import {beforeEach, describe, expect, it, vi, type Mock, afterEach} from 'vitest'
import { mockChatMessage, mockUser } from '@revolutionarygamesco/common-foundryvtt/mocks'
import * as nationalities from '../types/enums/nationality.ts'
import * as genders from '../types/enums/gender.ts'
import * as generatePersonalName from '../personal.ts'
import { defaultOnComplete } from './person.ts'

describe('Person Dialog defaultOnComplete', () => {
  let spy: Mock
  let create: Mock

  beforeEach(() => {
    mockUser({ id: 'user-1' })
    create = mockChatMessage()
    spy = vi.spyOn(generatePersonalName, 'default')
  })

  afterEach(() => {
    spy.mockRestore()
    create.mockRestore()
  })

  it('passes valid nationality, gender through', async () => {
    await defaultOnComplete('Akan', 'Feminine')
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ nationality: 'Akan', gender: 'Feminine' }), undefined, ['user-1'])
  })

  it('selects random nationality when the string is not valid', async () => {
    const random = vi.spyOn(nationalities, 'selectRandomNationality').mockResolvedValue('Bantu')
    await defaultOnComplete('Random', 'Feminine')
    expect(random).toHaveBeenCalled()
    random.mockRestore()
  })

  it('selects random gender when the string is not valid', async () => {
    const random = vi.spyOn(genders, 'selectRandomGender').mockReturnValue('Masculine')
    await defaultOnComplete('Akan', 'Random')
    expect(random).toHaveBeenCalled()
    random.mockRestore()
  })

  it('whispers to the current user', async () => {
    await defaultOnComplete('Akan', 'Feminine')
    expect(create.mock.calls[0]![0].whisper).toEqual(['user-1'])
  })
})
