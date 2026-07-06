import roll from './roll.ts'

const check = async (
  expr: string,
  fn: (n: number) => boolean
): Promise<boolean> => {
  const result = await roll(expr)
  return fn(result)
}

export default check
