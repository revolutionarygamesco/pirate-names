import generateBasicName from '../../basic.ts'

const generateEnglishName = async (
  gender: Gender
): Promise<string> => {
  return await generateBasicName('English', gender)
}

export default generateEnglishName
