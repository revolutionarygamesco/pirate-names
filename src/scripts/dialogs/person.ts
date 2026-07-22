import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { nationalities, isNationality, selectRandomNationality, type Nationality } from '../types/enums/nationality.ts'
import { genders, isGender, selectRandomGender, type Gender } from '../types/enums/gender.ts'
import generateName from '../full.ts'

const defaultOnComplete = async (nation: string, gender: string) => {
  const scope = nation === 'Random Pirate' ? 'pirate' : 'person'
  const n: Nationality = isNationality(nation) ? nation : await selectRandomNationality(scope)
  const g: Gender = isGender(gender) ? gender : selectRandomGender()
  const whisper = [game.user.id]
  await generateName(n, g, whisper)
}

const openGeneratePersonalNameDialog = async (
  onComplete: (nation: string, type: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const t = scopeLocalizer(MODULE_ID, 'dialog', 'person')
  const title = t('title')

  const nationalityOptions = ['Random Person', 'Random Pirate', ...nationalities].map(nation => {
    const value = t(['nationalities', 'options', nation])
    return `<option value="${nation}">${value}</option>`
  }).join('\n')

  const genderOptions = ['Random', ...genders].map(gender => {
    const value = t(['gender', 'options', gender])
    return `<option value="${gender}">${value}</option>`
  }).join('\n')

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-generate-personal-name`,
    window: { title },
    position: { width: 500 },
    content: `
        <label for="generate-personal-name-dialog-nationality">
          ${t(['nationalities', 'label'])}
        </label>
        <p class="hint">
          ${t(['nationalities', 'hint'])}
        </p>
        <select name="nationality" id="generate-personal-name-dialog-nationality">
          ${nationalityOptions}
        </select>
        
        <label for="generate-personal-name-dialog-gender">
          ${t(['gender', 'label'])}
        </label>
        <p class="hint">
          ${t(['gender', 'hint'])}
        </p>
        <select name="gender" id="generate-personal-name-dialog-gender">
          ${genderOptions}
        </select>
      `,
    buttons: [
      {
        action: 'generate',
        label: t(['actions', 'generate']),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const nation: string | undefined = (coll.namedItem('nationality') as HTMLSelectElement).value
          const gender: string | undefined = (coll.namedItem('gender') as HTMLSelectElement).value
          await onComplete(nation, gender)
        }
      },
      {
        action: 'cancel',
        label: t(['actions', 'cancel']),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openGeneratePersonalNameDialog
