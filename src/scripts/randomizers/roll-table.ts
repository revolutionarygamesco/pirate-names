import { fromUuid } from '../wrapper.ts'

const reduceRollTableDraw = (orig: any): RollTableResult => {
  const obj: RollTableResult = {}

  if (orig.type) obj.type = orig.type as string | undefined
  if (orig.img) obj.img = orig.img as string | undefined
  if (orig.name) obj.name = orig.name as string | undefined
  if (orig.description) obj.description = orig.description as string | undefined

  return obj
}

const rollTable = async (
  id: string,
  options?: RollTableOptions
): Promise<RollTableResult | null> => {
  const table = await fromUuid(id)
  if (!table || typeof table.draw !== 'function') return null
  const { results } = await table.draw(options)
  return results.length > 0
    ? reduceRollTableDraw(results[0])
    : null
}

export default rollTable
