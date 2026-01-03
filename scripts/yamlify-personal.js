import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'csv-parse/sync'
import { stringify } from 'yaml'
import generateID from './generate-id.js'

const headers = {
  n: '5d20',
  m: 'Masculine Name',
  f: 'Feminine Name',
  s: 'Surname'
}

const getRange = (min, max) => {
  const lower = isNaN(min) ? min : parseInt(min)
  if (isNaN(lower)) return [1, 1]

  const upper = max === undefined
    ? lower
    : isNaN(max) ? max : parseInt(max)

  return isNaN(upper) ? [lower, lower] : [lower, upper]
}

const createResult = (tableId, description, min, max) => {
  const _id = generateID()
  const _key = `!tables.results!${tableId}.${_id}`
  const range = getRange(min, max)
  return { _id, _key, range, weight: 1, type: 'text', description }
}

const createTable = (name, description, folder, rows) => {
  const _id = generateID()
  const _key = `!tables!${_id}`
  const results = rows.map(row => createResult(_id, row.description, row.range))
  return { _id, _key, name, description, img: 'icons/svg/d20-grey.svg', formula: '5d20', folder, results }
}

const convertTable = (culture, descriptor, folder, header, records) => {
  const name = `${culture} ${descriptor}`
  const description = `A selection of popular 18th century ${culture} ${descriptor.toLowerCase()}.`
  const rows = records.map(record => ({ range: record[headers.n], description: record[header] }))
  return createTable(name, description, folder, rows)
}

const convert = (csv, culture, folder) => {
  const raw = readFileSync(csv, 'utf-8')
  const records = parse(raw, { columns: true, skip_empty_lines: true })

  const masc = convertTable(culture, 'Masculine Names', folder, headers.m, records)
  const fem = convertTable(culture, 'Feminine Names', folder, headers.f, records)
  const sur = convertTable(culture, 'Surnames', folder, headers.s, records)

  writeFileSync(`./src/packs/rolltables/personal.${culture.toLowerCase()}.masc.yaml`, stringify(masc))
  writeFileSync(`./src/packs/rolltables/personal.${culture.toLowerCase()}.fem.yaml`, stringify(fem))
  writeFileSync(`./src/packs/rolltables/personal.${culture.toLowerCase()}.sur.yaml`, stringify(sur))
}

const [csv, culture, folder] = process.argv.slice(2)

if (!csv || !culture || !folder) {
  console.error('Usage: npm run yamlify-personal <csv> <culture> <folder>')
  process.exit(1)
}

convert(csv, culture, folder)
