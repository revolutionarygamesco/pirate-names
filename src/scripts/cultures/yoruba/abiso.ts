import check from '../../randomizers/check.ts'
import generateGivenName from '../../given.ts'
import rollTableFallback from '../../randomizers/roll-table-fallback.ts'
import { otherNames } from '../../../ids.ts'

const constructAbiso = async (
  gender: Gender
): Promise<string> => {
  const useAnimateSubject = await check('1d20', r => r > 10)
  const subjects = useAnimateSubject
    ? gender === 'Masculine'
      ? otherNames.Yoruba.Subjects.Animate.Masculine
      : otherNames.Yoruba.Subjects.Animate.Feminine
    : otherNames.Yoruba.Subjects.Inanimate
  const predicates = useAnimateSubject
    ? otherNames.Yoruba.Predicates.Animate
    : otherNames.Yoruba.Predicates.Core

  const subject = await rollTableFallback(subjects, 'Adé')
  const predicate = await rollTableFallback(predicates, 'lọ́lá')
  return subject + predicate
}

const generateAbiso = async (
  gender: Gender
): Promise<string> => {
  const useCommon = await check('1d20', r => r > 10)

  if (useCommon) return await generateGivenName('Yoruba', gender)
  return constructAbiso(gender)
}

export default generateAbiso
