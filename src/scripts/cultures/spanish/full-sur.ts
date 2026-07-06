import generateSpanishSurname from './sur.ts'

const generateFullSpanishSurname = async (): Promise<string> => {
  const father = await generateSpanishSurname()
  const mother = await generateSpanishSurname()
  return `${father} y ${mother}`
}

export default generateFullSpanishSurname
