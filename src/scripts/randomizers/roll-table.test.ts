import rollTable, { reduceRollTableDraw } from './roll-table.ts'

jest.mock('../wrapper.ts', () => ({
  fromUuid: jest.fn().mockResolvedValue({ draw: async () => { return { results: [{ description: 'Test' }] } } })
}))

describe('reduceRollTableDraw', () => {
  it('captures the type', () => {
    const type = 'test'
    const actual = reduceRollTableDraw({ type })
    expect(actual.type).toBe(type)
  })

  it('captures the img', () => {
    const img = 'test'
    const actual = reduceRollTableDraw({ img })
    expect(actual.img).toBe(img)
  })

  it('captures the name', () => {
    const name = 'test'
    const actual = reduceRollTableDraw({ name })
    expect(actual.name).toBe(name)
  })

  it('captures the description', () => {
    const description = 'test'
    const actual = reduceRollTableDraw({ description })
    expect(actual.description).toBe(description)
  })

  it('captures all of them at once', () => {
    const type = 'test'
    const img = '/path/to/img.png'
    const name = 'Test Result'
    const description = 'This is only a test.'
    const actual = reduceRollTableDraw({ type, img, name, description })

    expect(actual.type).toBe(type)
    expect(actual.img).toBe(img)
    expect(actual.name).toBe(name)
    expect(actual.description).toBe(description)
  })
})

describe('rollTable', () => {
  it('rolls on the table specified', async () => {
    const actual = await rollTable('id')
    expect(actual?.description).toBe('Test')
  })
})
