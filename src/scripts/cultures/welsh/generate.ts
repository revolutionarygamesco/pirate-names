import { type Gender } from '../../enums/gender.ts'
import generateBasicName from '../../basic.ts'

const generateWelshName = async (
  gender: Gender
): Promise<string> => {
  return await generateBasicName('Welsh', gender)
}

export default generateWelshName
