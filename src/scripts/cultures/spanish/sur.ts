import { chance } from '@revolutionarygamesco/common'
import generateSurname from '../../surname.ts'

const generateSpanishSurname = async (): Promise<string> => {
  const surname = await generateSurname('Spanish')
  return chance(3, 10)
    ? surname
    : `${surname}-${await generateSurname('Spanish')}`
}

export default generateSpanishSurname
