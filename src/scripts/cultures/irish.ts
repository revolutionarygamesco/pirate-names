import generateGivenName from '../given.ts'
import generateSurname from '../surname.ts'

const separateAnglicizedIrishName = (str: string): { gaelic: string, anglicization: string } => {
  const match = str.match(/(.*?) \((.*?)\)/)
  const gaelic = match ? match[1] : str
  const anglicization = match ? match[2] : str
  return { gaelic, anglicization }
}

const renderGaelicName = (given: string, surname: string): string => {
  const separatedGiven = separateAnglicizedIrishName(given)
  const separatedSurname = separateAnglicizedIrishName(surname)
  const gaelic = `${separatedGiven.gaelic} ${separatedSurname.gaelic}`
  const anglicization = `${separatedGiven.anglicization} ${separatedSurname.anglicization}`
  return gaelic === anglicization
    ? gaelic
    : `${gaelic} (${anglicization})`
}

const generateIrishName = async (
  gender: Gender
): Promise<string> => {
  const given = await generateGivenName('Irish', gender)
  const surname = await generateSurname('Irish')
  return renderGaelicName(given, surname)
}

export default generateIrishName
