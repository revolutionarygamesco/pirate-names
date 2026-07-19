import { registerAPI } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings'

import generateName from './full.ts'
import generateShipName, { generatePirateShipName } from './ship.ts'
import openGeneratePersonalNameDialog from './dialogs/person.ts'
import openGenerateShipNameDialog from './dialogs/ship.ts'

registerAPI(MODULE_ID, {
  generateName,
  generateShipName,
  generatePirateShipName,
  openGenerateNameDialog: openGeneratePersonalNameDialog,
  openGeneratePersonalNameDialog,
  openGenerateShipNameDialog
})
