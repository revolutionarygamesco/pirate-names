import { MODULE_ID } from '../settings.ts'
import { localize } from '../wrapper.ts'
import { isColors, pickColors } from '../enums/nationality.ts'
import generateShipName, { generatePirateShipName } from '../ship.ts'

const defaultOnComplete = async (c: Colors | 'Pirate' | 'Random', t: string) => {
  const whisper = [game.user.id]
  if (c === 'Pirate') { await generatePirateShipName(whisper); return }

  const colors = isColors(c) ? c : await pickColors()
  const martial = t === 'Martial'
  await generateShipName({ colors, martial, whisper })
}

const openGenerateShipNameDialog = async (
  onComplete: (c: Colors | 'Pirate' | 'Random', t: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const title = localize(`${MODULE_ID}.dialog.ship.title`)

  const nationalities = ['Random', 'Spanish', 'British', 'French', 'Dutch', 'Pirate'].map(nation => {
    const value = localize(`${MODULE_ID}.dialog.ship.nationalities.options.${nation}`)
    const input = nation === 'Random'
      ? `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" checked />`
      : `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" />`
    const flag = `<img src="/modules/${MODULE_ID}/images/${nation.toLowerCase()}.png" alt="${value}" class="flag" />`
    const label = `<label for="nationality-${nation}">${flag} ${value}</label>`
    return `<li>${input}\n${label}</li>`
  }).join('\n')

  const types = ['Commercial', 'Martial'].map(t => {
    const label = localize(`${MODULE_ID}.dialog.ship.type.options.${t}.label`)
    const hint = localize(`${MODULE_ID}.dialog.ship.type.options.${t}.hint`)
    const id = [name, t.toLowerCase()].join('-')
    const input = t === 'Commercial'
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
          <legend>${localize(`${MODULE_ID}.dialog.ship.nationalities.label`)}</legend>
          <ul>
            ${nationalities}
          </ul>
        </fieldset>
        
        <fieldset class="generate-ship-dialog-type">
          <legend>${localize(`${MODULE_ID}.dialog.ship.type.label`)}</legend>
          <ul>
            ${types}
          </ul>
        </fieldset>
      `,
    buttons: [
      {
        action: 'generate',
        label: localize(`${MODULE_ID}.dialog.person.actions.generate`),
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
        label: localize(`${MODULE_ID}.dialog.person.actions.cancel`),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openGenerateShipNameDialog
