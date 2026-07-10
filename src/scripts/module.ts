import { MODULE_ID } from './settings'

import generateName from './full.ts'
import generateShipName, { generatePirateShipName } from './ship.ts'
import openGeneratePersonalNameDialog from './dialogs/person.ts'
import openGenerateShipNameDialog from './dialogs/ship.ts'

Hooks.once('init', async () => {
  const generator = game.modules.get(MODULE_ID)
  if (!generator) return

  generator.api = {
    generateName,
    generateShipName,
    generatePirateShipName,
    openGenerateNameDialog: openGeneratePersonalNameDialog,
    openGeneratePersonalNameDialog,
    openGenerateShipNameDialog
  }
})
