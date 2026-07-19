import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { colors, isColors, selectRandomColors, type Colors } from '../enums/colors.ts'
import generateShipName, { generatePirateShipName } from '../ship.ts'

const defaultOnComplete = async (
  c: Colors | 'Pirate' | 'Random',
  t: string
) => {
  const whisper = [game.user.id]
  if (c === 'Pirate') { await generatePirateShipName(whisper); return }

  const colors = isColors(c) ? c : await selectRandomColors()
  const martial = t === 'Martial'
  await generateShipName({ colors, martial, whisper })
}

const openGenerateShipNameDialog = async (
  onComplete: (c: Colors | 'Pirate' | 'Random', t: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const t = scopeLocalizer(MODULE_ID, 'dialog', 'ship')
  const title = t(['title'])

  const nationalities = ['Random', ...colors, 'Pirate'].map(nation => {
    const value = t(['nationalities', 'options', nation])
    const input = nation === 'Random'
      ? `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" checked />`
      : `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" />`
    const flag = `<img src="/modules/${MODULE_ID}/images/${nation.toLowerCase()}.png" alt="${value}" class="flag" />`
    const label = `<label for="nationality-${nation}">${flag} ${value}</label>`
    return `<li>${input}\n${label}</li>`
  }).join('\n')

  const types = ['Commercial', 'Martial'].map(use => {
    const label = t(['type', 'options', use, 'label'])
    const hint = t(['type', 'options', use, 'hint'])
    const id = ['use', use.toLowerCase()].join('-')
    const input = use === 'Commercial'
      ? `<input type="radio" id="${id}" name="type" value="${t}" checked />`
      : `<input type="radio" id="${id}" name="type" value="${t}" />`
    return `<li>${input}<label for="${id}">${label}</label><p class="hint">${hint}</p></li>`
  }).join('\n')

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-generate-ship-name`,
    window: { title },
    position: { width: 700 },
    content: `
        <fieldset class="generate-ship-name-dialog-nationality">
          <legend>${t(['nationalities', 'label'])}</legend>
          <ul>
            ${nationalities}
          </ul>
        </fieldset>
        
        <fieldset class="generate-ship-dialog-type">
          <legend>${t(['type', 'label'])}</legend>
          <ul>
            ${types}
          </ul>
        </fieldset>
      `,
    buttons: [
      {
        action: 'generate',
        label: t(['actions', 'generate']),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const nation: string | undefined = (coll.namedItem('nationality') as RadioNodeList).value
          const type: string | undefined = (coll.namedItem('type') as RadioNodeList).value
          await onComplete(nation as Colors | 'Pirate' | 'Random', type)
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

export default openGenerateShipNameDialog
