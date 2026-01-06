import { MODULE_ID } from './settings'

import rollTable from './roll-table.ts'
import generateGivenName from './given.ts'
import generateSurname from './surname.ts'
import generateName from './full.ts'
import generateShipName, { generatePirateShipName } from './ship.ts'
import openGeneratePersonalNameDialog from './dialogs/person.ts'

Hooks.once('init', async () => {
  const generator = game.modules.get(MODULE_ID)
  if (!generator) return

  generator.api = {
    rollTable,
    generateGivenName,
    generateSurname,
    generateName,
    generateShipName,
    generatePirateShipName,
    openGenerateNameDialog: openGeneratePersonalNameDialog,
    openGeneratePersonalNameDialog
  }
})
