import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import {
  nationalities,
  isNationality,
  selectRandomNationality,
  type Nationality
} from '../types/enums/nationality.ts'
import {
  genders,
  isGender,
  selectRandomGender,
  type Gender
} from '../types/enums/gender.ts'
import generatePersonalName from '../personal.ts'

const defaultOnComplete = async (
  n: string,
  g: string
): Promise<void> => {
  const scope = n === 'Random Pirate' ? 'pirate' : 'person'
  const nationality: Nationality = isNationality(n) ? n : await selectRandomNationality(scope)
  const gender: Gender = isGender(g) ? g : selectRandomGender()
  await generatePersonalName({ nationality, gender }, [game.user.id])
}

const openGeneratePersonalNameDialog = async (
  onComplete: (nation: string, type: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const t = scopeLocalizer([MODULE_ID, 'dialog', 'person'].join('.'))

  const nationalitySelector = foundry.applications.fields.createSelectInput({
    name: 'nationality',
    options: ['Random Person', 'Random Pirate', ...nationalities].map(option => ({
      value: option,
      label: t(['nationalities', 'options', option])
    }))
  })

  const nationality = foundry.applications.fields.createFormGroup({
    input: nationalitySelector,
    label: t(['nationalities', 'label']),
    hint: t(['nationalities', 'hint'])
  })

  const genderSelector = foundry.applications.fields.createSelectInput({
    name: 'gender',
    options: ['Random Gender', ...genders].map(option => ({
      value: option,
      label: t(['gender', 'options', option])
    }))
  })

  const gender = foundry.applications.fields.createFormGroup({
    input: genderSelector,
    label: t(['gender', 'label']),
    hint: t(['gender', 'hint'])
  })

  const data = await foundry.applications.api.DialogV2.input({
    window: { title: t('title') },
    position: { width: 500 },
    content: `${nationality.outerHTML}\n${gender.outerHTML}`,
    ok: { label: t(['actions', 'generate']) }
  })

  if (!data) return
  await onComplete(data.nationality as string, data.gender as string)
}

export default openGeneratePersonalNameDialog
