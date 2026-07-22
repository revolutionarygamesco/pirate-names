import { isString } from '@revolutionarygamesco/common'
import { drawGuarded } from '@revolutionarygamesco/common-foundryvtt'
import { chance } from '@revolutionarygamesco/common'
import { type Gender } from '../../types/enums/gender.ts'
import generateGivenName from '../../given.ts'
import { otherNames } from '../../../ids.ts'

const constructAbiso = async (
  gender: Gender
): Promise<string> => {
  const useAnimateSubject = chance(1, 2)
  const subjects = useAnimateSubject
    ? gender === 'Masculine'
      ? otherNames.Yoruba.Subjects.Animate.Masculine
      : otherNames.Yoruba.Subjects.Animate.Feminine
    : otherNames.Yoruba.Subjects.Inanimate
  const predicates = useAnimateSubject
    ? otherNames.Yoruba.Predicates.Animate
    : otherNames.Yoruba.Predicates.Core

  const subject = await drawGuarded(subjects, isString, 'Adé')
  const predicate = await drawGuarded(predicates, isString, 'lọ́lá')
  return subject + predicate
}

const generateAbiso = async (
  gender: Gender
): Promise<string> => {
  return chance(1, 3)
    ? await generateGivenName('Yoruba', gender)
    : constructAbiso(gender)
}

export default generateAbiso
