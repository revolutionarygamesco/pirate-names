import rollTable from './roll-table.ts'

const rollTableFallback = async (
  table: string,
  fallback: string
): Promise<string> => {
  const draw = await rollTable(table, { displayChat: false })
  return draw?.description ?? fallback
}

export default rollTableFallback
