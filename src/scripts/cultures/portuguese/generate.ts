import { type Gender } from '../../enums/gender.ts'
import generatePortugueseGivenNames from './givens.ts'
import generatePortugueseSurnames from './surs.ts'

const generatePortugueseName = async (
  gender: Gender
): Promise<string> => {
  const given = await generatePortugueseGivenNames(gender)
  const surnames = await generatePortugueseSurnames()
  return [...given, ...surnames].join(' ')
}

export default generatePortugueseName
