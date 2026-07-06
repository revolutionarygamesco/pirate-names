import check from '../randomizers/check.ts'
import generateSurname from '../surname.ts'
import generateGivenName from '../given.ts'

const generateSpanishSurname = async (): Promise<string> => {
  const surname = await generateSurname('Spanish')
  return await check('d10', r => r < 7)
    ? surname
    : `${surname}-${await generateSurname('Spanish')}`
}

const generateFullSpanishSurname = async (): Promise<string> => {
  const father = await generateSpanishSurname()
  const mother = await generateSpanishSurname()
  return `${father} y ${mother}`
}

const generateSpanishName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('Spanish', gender)
  const surname = await generateFullSpanishSurname()
  return `${given} ${surname}`
}

export default generateSpanishName
