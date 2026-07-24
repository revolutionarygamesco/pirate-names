import { chance, selectRandomElement } from '@revolutionarygamesco/common'
import { drawStr } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomColors, colors, type Colors } from '../types/enums/colors.ts'
import { selectRandomShipRole, type ShipRole } from '../types/enums/roles.ts'
import getRollTableUUID from '../get-rolltable-uuid.ts'

export const ShipNameTables = {
  Spanish: {
    Merchant: getRollTableUUID('8ZfbVJJv0HQRHcZX'),
    War: getRollTableUUID('TXi8XiIIjwVG3pXS'),
    Religious: getRollTableUUID('uRfaOZUkJYPvIaG1')
  },
  British: {
    Merchant: getRollTableUUID('9cBmsorkKhOHGYGQ'),
    War: getRollTableUUID('dFEX3BCDJboj1FDj')
  },
  French: {
    Merchant: getRollTableUUID('1sTaZb3ssDQrBoDp'),
    War: getRollTableUUID('Hz8mjlKg3hlKiFfL')
  },
  Dutch: {
    Merchant: getRollTableUUID('gwzbKSGJRXgavJGb'),
    War: getRollTableUUID('3PDJNlg6fXA0KK06')
  },
  Pirate: getRollTableUUID('ScPMf8BdSRKDbFKF')
}

export interface ShipParams {
  colors: Colors
  role: ShipRole
  privateer: boolean
  names: Record<string, string>
}

class Ship {
  colors: Colors
  role: ShipRole
  privateer: boolean
  names: Record<string, string>

  constructor(params?: Partial<ShipParams>) {
    this.colors = params?.colors ?? selectRandomElement([...colors])
    this.role = params?.role ?? selectRandomShipRole()
    this.privateer = params?.privateer ?? chance(2, 3)
    this.names = params?.names ?? {}

    if (this.colors === 'Pirate') this.role = 'Man-of-War'
    if (this.role === 'Merchantman') this.privateer = false
    if (this.colors === 'Pirate') this.privateer = true
  }

  getRollTableUUID (religious?: 'religious'): string {
    if (this.colors === 'Spanish' && religious) return ShipNameTables.Spanish.Religious
    if (this.colors === 'Pirate') return ShipNameTables.Pirate
    const tag = this.role === 'Man-of-War' ? 'War' : 'Merchant'
    return ShipNameTables[this.colors][tag]
  }

  static async generate (params?: Partial<ShipParams>): Promise<Ship> {
    const colors = params?.colors ?? await selectRandomColors()
    const role = params?.role ?? selectRandomShipRole()

    const instance = new Ship({ colors, role })
    instance.names[colors.toLowerCase()] = await drawStr(instance.getRollTableUUID(), 'Hispaniola')
    if (colors === 'Spanish') {
      instance.names.religious = await drawStr(instance.getRollTableUUID('religious'), 'Santa Cruz')
    } else if (colors === 'Pirate') {
      const former = await Ship.generate({ role: 'Merchantman' })
      instance.names = { ...instance.names, ...former.names }
    }

    return instance
  }
}

export default Ship
