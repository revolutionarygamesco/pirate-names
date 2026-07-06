import renderGaelicName from './render.ts'

describe('renderGaelicName', () => {
  it('renders an Irish Gaelic name with Anglicization', () => {
    const actual = renderGaelicName('Muire (Mary)', 'Ó Broin (Byrne)')
    expect(actual).toEqual('Muire Ó Broin (Mary Byrne)')
  })
})
