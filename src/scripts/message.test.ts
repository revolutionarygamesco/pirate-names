import { describe, expect, it, type Mock } from 'vitest'
import { mockChatMessage } from '@revolutionarygamesco/common-foundryvtt/mocks'
import BirthContext from './classes/birth/base.ts'
import EnglishFamily from './classes/families/english.ts'
import EnglishPersonalName from './classes/personal-names/english.ts'
import SpanishFamily from './classes/families/spanish.ts'
import SpanishPersonalName from './classes/personal-names/spanish.ts'
import sendMessage from './message.ts'

const payload = (create: Mock) => create.mock.calls[0]![0]

describe('sendMessage', () => {
  const smiths = new EnglishFamily({ name: 'Smith' })
  const johnnyBirth = new BirthContext({}, smiths)
  const johnny = new EnglishPersonalName({ personal: 'John' }, johnnyBirth)

  const picassos = new SpanishFamily({ name: 'Picasso', full: 'Cipriano de la Santísima Trinidad Ruiz y Picasso' })
  const pabloBirth = new BirthContext({}, picassos)
  const pablo = new SpanishPersonalName({ personal: 'Pablo' }, pabloBirth)

  const expected: Record<string, string> = {
    johnny: 'revolutionary-piratenames.message.versions.lederevolutionary-piratenames.message.versions.fullrevolutionary-piratenames.message.versions.personalrevolutionary-piratenames.message.versions.formal',
    pablo: 'revolutionary-piratenames.message.versions.lederevolutionary-piratenames.message.versions.fullrevolutionary-piratenames.message.versions.shortrevolutionary-piratenames.message.versions.personalrevolutionary-piratenames.message.versions.formal'
  }

  it('sends a chat message', async () => {
    const create = mockChatMessage()
    await sendMessage([johnny], [])
    expect(payload(create).content).toBe(expected.johnny)
  })

  it('will send the short form for names that have them', async () => {
    const create = mockChatMessage()
    await sendMessage([pablo], [])
    expect(payload(create).content).toBe(expected.pablo)
  })

  it('will send multiple names', async () => {
    const create = mockChatMessage()
    await sendMessage([johnny, pablo], [])
    expect(payload(create).content).toBe(`${expected.johnny}<hr />${expected.pablo}`)
  })
})
