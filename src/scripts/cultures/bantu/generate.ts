import generateNkumbu from './nkumbu.ts'
import generateSantu from './santu.ts'
import generateInitiationName from './init.ts'
import pickSpecialNames from './special.ts'

const generateBantuName = async (
  gender: Gender
): Promise<string> => {
  const special = await pickSpecialNames()

  const names = []

  if (special === 'santu') names.push(await generateSantu())

  names.push(await generateNkumbu())
  names.push('a')
  names.push(await generateNkumbu())

  if (special === 'initiation') names.push(await generateInitiationName(gender))

  return names.join(' ')
}

export default generateBantuName
