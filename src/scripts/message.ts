import { whisper, scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import PersonalName from './classes/personal-names/base.ts'
import SpanishPersonalName from './classes/personal-names/spanish.ts'
import PortuguesePersonalName from './classes/personal-names/portuguese.ts'

const sendMessage = async (
  names: PersonalName[],
  recipients: string[]
): Promise<void> => {
  const t = scopeLocalizer([MODULE_ID, 'message', 'versions'].join('.'))
  const messages = names.map(name => {
    const hasShort = (name instanceof PortuguesePersonalName || name instanceof SpanishPersonalName)
    const mister = name.gender === 'Masculine' ? 'Mr.' : 'Mrs.'
    const lines: string[] = [
      t('lede', { gender: name.gender.toLowerCase(), nationality: name.nationality }),
      t('full', { full: name.full })
    ]
    if (hasShort) lines.push(t('short', { short: name.short }))
    lines.push(
      t('personal', { personal: name.personal }),
      t('formal', { formal: name.address(mister) })
    )
    return lines.join('')
  })

  const content = messages.join('<hr />')
  await whisper({
    recipients,
    speaker: game.i18n.localize([MODULE_ID, 'message', 'speaker'].join('.')),
    flavor: game.i18n.localize([MODULE_ID, 'message', 'flavor', 'personal'].join('.')),
    content
  })
}

export default sendMessage
