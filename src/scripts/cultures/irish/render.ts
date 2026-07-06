import separateAnglicizedIrishName from './separate.ts'

const renderGaelicName = (given: string, surname: string): string => {
  const separatedGiven = separateAnglicizedIrishName(given)
  const separatedSurname = separateAnglicizedIrishName(surname)
  const gaelic = `${separatedGiven.gaelic} ${separatedSurname.gaelic}`
  const anglicization = `${separatedGiven.anglicization} ${separatedSurname.anglicization}`
  return gaelic === anglicization
    ? gaelic
    : `${gaelic} (${anglicization})`
}

export default renderGaelicName
