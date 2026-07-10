const concatWithElision = (...strs: string[]): string => {
  const [first, ...toAdd] = strs
  let c = first

  for (const str of toAdd) {
    const end = c.at(-1) ?? ''
    const s = str.startsWith(end)
      ? str.slice(1)
      : str
    c += s
  }

  return c
}

export default concatWithElision
