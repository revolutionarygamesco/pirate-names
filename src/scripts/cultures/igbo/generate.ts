import { type Gender } from '../../enums/gender.ts'
import generateGivenName from '../../given.ts'
import generateWeekdayName from './weekday.ts'

const generateIgboName = async (
  gender: Gender
): Promise<string> => {
  const weekday = await generateWeekdayName(gender)
  const personal = await generateGivenName('Igbo', gender)
  const father = await generateGivenName('Igbo', 'Masculine')
  return [weekday, personal, father].join(' ')
}

export default generateIgboName
