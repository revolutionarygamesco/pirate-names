import { selectRandomBand } from '@revolutionarygamesco/common'

const pickCaste = async (): Promise<string> => {
  return selectRandomBand([
    { range: [1, 97], value: 'Foro' },
    { range: [98], value: 'Nyamakala' },
    { range: [99], value: 'Jali' },
    { range: [100], value: 'Jakhanke' }
  ]) ?? 'Foro'
}

export default pickCaste
