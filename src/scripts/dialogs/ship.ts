import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import {
  colors,
  isColors,
  selectRandomColors,
  type Colors
} from '../types/enums/colors.ts'
import {
  shipRoles,
  isShipRole,
  selectRandomShipRole,
  type ShipRole
} from '../types/enums/roles.ts'
import generateShipName from '../ship.ts'

export const defaultOnComplete = async (
  c: string,
  r: string
): Promise<void> => {
  const colors: Colors = isColors(c) ? c : await selectRandomColors()
  const role: ShipRole = isShipRole(r) ? r : selectRandomShipRole()
  await generateShipName({ colors, role }, [game.user.id])
}

const openGenerateShipNameDialog = async (
  onComplete: (colors: string, role: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const t = scopeLocalizer([MODULE_ID, 'dialog', 'ship'].join('.'))

  const options = ['Random', ...colors].map(option => ({
    value: option,
    label: t(['colors', 'options', option]),
    flag: `modules/${MODULE_ID}/images/${option.toLowerCase()}.webp`,
    checked: option === 'Random'
  }))

  const nationality = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/colors.hbs`,
    {
      options,
      colorsLabel: t(['colors', 'label'])
    }
  )

  const roleSelector = foundry.applications.fields.createSelectInput({
    name: 'role',
    options: ['Random', ...shipRoles].map(option => ({
      value: option,
      label: t(['role', 'options', option])
    }))
  })

  const role = foundry.applications.fields.createFormGroup({
    input: roleSelector,
    label: t(['role', 'label']),
    hint: t(['role', 'hint'])
  })

  const data = await foundry.applications.api.DialogV2.input({
    window: { title: t('title') },
    position: { width: 500 },
    content: `${nationality}\n${role.outerHTML}`,
    ok: { label: t(['actions', 'generate']) }
  })

  if (!data) return
  await onComplete(data.colors as string, data.role as string)
}

export default openGenerateShipNameDialog
