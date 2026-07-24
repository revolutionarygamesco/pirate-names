import { registerAPI } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'

import generatePersonalName from './personal.ts'
import openGeneratePersonalNameDialog from './dialogs/person.ts'

registerAPI(MODULE_ID, {
  generatePersonalName,
  openGeneratePersonalNameDialog,
})
