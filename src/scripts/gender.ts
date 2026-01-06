import { genders as id } from '../ids.ts'
import rollTable from './roll-table.ts'

export const genders: Gender[] = ['Feminine', 'Masculine']

export const isGender = (candidate: unknown): candidate is Gender => {
  if (typeof candidate !== 'string') return false
  return genders.includes(candidate as Gender)
}

export const pickGender = async (): Promise<Gender> => {
  const drawn = await rollTable(id, { displayChat: false })
  const g = drawn?.description
  return isGender(g) ? g : 'Masculine'
}
