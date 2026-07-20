const separateParenthetical = (
  str: string
): { regular: string, parenthetical: string } => {
  const match = str.match(/(.*?) \((.*?)\)/)
  const regular = match ? match[1] : str
  const parenthetical = match ? match[2] : str
  return { regular, parenthetical }
}

export default separateParenthetical
