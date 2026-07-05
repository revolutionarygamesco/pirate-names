import {
  isWeekday,
  pickWeekday,
  weekdayNames
} from './weekday.ts'

jest.mock('./wrapper.ts', () => ({
  fromUuid: jest.fn().mockResolvedValue({ draw: async () => { return { results: [{ description: 'Friday' }] } } })
}))

describe('isWeekday', () => {
  it.each([
    ['undefined', undefined],
    ['null', null],
    ['functions', () => {}],
    ['true', true],
    ['false', false],
    ['numbers', 42],
    ['a random string', 'German'],
    ['an array', []],
    ['an object', {}]
  ] as [string, any][])('rejects %s', (_desc: string, candidate: any) => {
    expect(isWeekday(candidate)).toBe(false)
  })

  it.each(weekdayNames)('accepts %s', (weekday: Weekday) => {
    expect(isWeekday(weekday)).toBe(true)
  })
})

describe('pickWeekday', () => {
  it('picks a random weekday', async () => {
    expect(await pickWeekday()).toBe('Friday')
  })
})
