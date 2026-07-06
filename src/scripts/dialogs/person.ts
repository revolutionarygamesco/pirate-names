import { MODULE_ID } from '../settings.ts'
import { localize } from '../wrapper.ts'
import { isNationality, pickNationality } from '../nationality.ts'
import { isGender, pickGender } from '../gender.ts'
import generateName from '../full.ts'

const defaultOnComplete = async (nation: string, gender: string) => {
  const scope = nation === 'Random Pirate' ? 'pirate' : 'person'
  const n = isNationality(nation) ? nation : await pickNationality(scope)
  const g = isGender(gender) ? gender : await pickGender()
  const whisper = [game.user.id]
  await generateName(n, g, whisper)
}

const openGeneratePersonalNameDialog = async (
  onComplete: (nation: string, type: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const title = localize(`${MODULE_ID}.dialog.person.personal.title`)

  const nationalityOptions = ['Random Person', 'Random Pirate', 'Spanish', 'English', 'French', 'Dutch', 'Scottish', 'Irish', 'Welsh', 'Portuguese', 'Akan'].map(nation => {
    const value = localize(`${MODULE_ID}.dialog.person.nationalities.options.${nation}`)
    return `<option value="${nation}">${value}</option>`
  }).join('\n')

  const genderOptions = ['Random', 'Masculine', 'Feminine'].map(t => {
    const value = localize(`${MODULE_ID}.dialog.person.gender.options.${t}`)
    return `<option value="${t}">${value}</option>`
  }).join('\n')

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-generate-personal-name`,
    window: { title },
    position: { width: 500 },
    content: `
        <label for="generate-personal-name-dialog-nationality">
          ${localize(`${MODULE_ID}.dialog.person.nationalities.label`)}
        </label>
        <p class="hint">
          ${localize(`${MODULE_ID}.dialog.person.nationalities.hint`)}
        </p>
        <select name="nationality" id="generate-personal-name-dialog-nationality">
          ${nationalityOptions}
        </select>
        
        <label for="generate-personal-name-dialog-gender">
          ${localize(`${MODULE_ID}.dialog.person.gender.label`)}
        </label>
        <p class="hint">
          ${localize(`${MODULE_ID}.dialog.person.gender.hint`)}
        </p>
        <select name="gender" id="generate-personal-name-dialog-gender">
          ${genderOptions}
        </select>
      `,
    buttons: [
      {
        action: 'generate',
        label: localize(`${MODULE_ID}.dialog.person.actions.generate`),
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
        label: localize(`${MODULE_ID}.dialog.person.actions.cancel`),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openGeneratePersonalNameDialog
