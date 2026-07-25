import { registerAPI } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'

import generatePersonalName from './personal.ts'
import generateShipName from './ship.ts'
import openGeneratePersonalNameDialog from './dialogs/person.ts'
import openGenerateShipNameDialog from './dialogs/ship.ts'

registerAPI(MODULE_ID, {
  generatePersonalName,
  generateShipName,
  openGeneratePersonalNameDialog,
  openGenerateShipNameDialog
})

Hooks.once('ready', async () => {
  await foundry.applications.handlebars.loadTemplates([
    `modules/${MODULE_ID}/templates/colors.hbs`
  ])
})
