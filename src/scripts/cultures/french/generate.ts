import { chance } from '@revolutionarygamesco/common'
import { type Gender } from '../../types/enums/gender.ts'
import generateGivenName from '../../given.ts'
import generateSurname from '../../surname.ts'

const jeanable = ['Baptiste', 'Paul', 'Pierre', 'Louis', 'Claude', 'François',
  'Jacques', 'Charles', 'Michel', 'Joseph', 'Marc', 'Luc', 'Philippe',
  'Christophe', 'René', 'Antoine', 'Gabriel']

const generateFrenchName = async (
  gender: Gender
): Promise<string> => {
  const orig = await generateGivenName('French', gender)
  const jean = gender === 'Masculine' && jeanable.includes(orig) && chance(1, 2)
  const given = jean ? `Jean-${orig}` : orig

  const surname = await generateSurname('French')

  return `${given} ${surname}`
}

export default generateFrenchName
