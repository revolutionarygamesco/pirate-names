const roll = async (
  expr: string
): Promise<number> => {
  const r = new Roll(expr)
  await r.evaluate()
  return r.total
}

export default roll
