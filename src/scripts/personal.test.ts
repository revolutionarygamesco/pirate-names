import { describe, expect, it, type Mock } from 'vitest'
import { isString } from '@revolutionarygamesco/common'
import { mockChatMessage } from '@revolutionarygamesco/common-foundryvtt/mocks'
import generatePersonalName from './personal.ts'

const payload = (create: Mock) => create.mock.calls[0]![0]

describe('generatePersonalName', () => {
  it('returns the name', async () => {
    const create = mockChatMessage()
    const [name] = await generatePersonalName({ nationality: 'Akan' }, { captain: 'Captain' })
    expect(name.nationality).toBe('Akan')
    expect(isString(name.personal)).toBe(true)
    expect(name.captain.startsWith('Captain ')).toBe(true)
    expect(create).not.toHaveBeenCalled()
  })

  it('whispers to the given recipients', async () => {
    const create = mockChatMessage()
    await generatePersonalName(undefined, undefined, ['user-1'])
    expect(payload(create).whisper).toEqual(['user-1'])
  })
})
