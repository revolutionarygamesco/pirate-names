import { type Gender } from '../../enums/gender.ts'
import generateBasicName from '../../basic.ts'

const generateScottishName = async (
  gender: Gender
): Promise<string> => {
  return await generateBasicName('Scottish', gender)
}

export default generateScottishName
