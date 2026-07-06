import generateSurname from '../../surname.ts'
import check from '../../randomizers/check.ts'

const generateSpanishSurname = async (): Promise<string> => {
  const surname = await generateSurname('Spanish')
  return await check('d10', r => r < 7)
    ? surname
    : `${surname}-${await generateSurname('Spanish')}`
}

export default generateSpanishSurname
