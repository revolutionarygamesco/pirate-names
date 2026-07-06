const separateAnglicizedIrishName = (str: string): { gaelic: string, anglicization: string } => {
  const match = str.match(/(.*?) \((.*?)\)/)
  const gaelic = match ? match[1] : str
  const anglicization = match ? match[2] : str
  return { gaelic, anglicization }
}

export default separateAnglicizedIrishName
