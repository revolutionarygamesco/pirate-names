import {describe, it, expect, beforeEach} from 'vitest'
import { loadYaml } from '@revolutionarygamesco/common/testing'
import { mockTables } from '@revolutionarygamesco/common-foundryvtt/mocks'
import { isColors } from '../types/enums/colors.ts'
import { isShipRole } from '../types/enums/roles.ts'
import getRollTableUUID from '../get-rolltable-uuid.ts'
import Ship, { ShipNameTables, type ShipParams } from './ship.ts'

describe('ShipNameTables', () => {
  const tables: Array<[string, string, string]> = [
    ['Spanish merchantmen', 'es.com', ShipNameTables.Spanish.Merchant],
    ['Spanish men-of-war', 'es.mil', ShipNameTables.Spanish.War],
    ['Spanish ships (religious)', 'es.rel', ShipNameTables.Spanish.Religious],
    ['British merchantmen', 'br.com', ShipNameTables.British.Merchant],
    ['British men-of-war', 'br.mil', ShipNameTables.British.War],
    ['French merchantmen', 'fr.com', ShipNameTables.French.Merchant],
    ['French men-of-war', 'fr.mil', ShipNameTables.French.War],
    ['Dutch merchantmen', 'du.com', ShipNameTables.Dutch.Merchant],
    ['Dutch men-of-war', 'du.mil', ShipNameTables.Dutch.War],
    ['pirate ships', 'pirates', ShipNameTables.Pirate]
  ]

  it.each(tables)('imports table for %s', (_desc, file, actual) => {
    const { _id } = loadYaml<{ _id: string }>(`src/packs/rolltables/ships.${file}.yaml`)
    expect(actual).toBe(getRollTableUUID(_id))
  })
})

describe('Ship', () => {
  beforeEach(() => {
    mockTables({
      [getRollTableUUID('CrljZ2S8EdjWco9K')]: { results: [{ description: 'Spanish' } as foundry.documents.TableResult] },
      [ShipNameTables.British.Merchant]: { results: [{ description: 'Salisbury' } as foundry.documents.TableResult] },
      [ShipNameTables.British.War]: { results: [{ description: 'Porphyrion' } as foundry.documents.TableResult] },
      [ShipNameTables.Spanish.Merchant]: { results: [{ description: 'Alondra' } as foundry.documents.TableResult] },
      [ShipNameTables.Spanish.War]: { results: [{ description: 'Aurora' } as foundry.documents.TableResult] },
      [ShipNameTables.Spanish.Religious]: { results: [{ description: 'Nuestra Señora del Coro' } as foundry.documents.TableResult] },
      [ShipNameTables.Pirate]: { results: [{ description: 'Queen Anne’s Revenge' } as foundry.documents.TableResult] }
    })
  })

  describe('constructor', () => {
    it('returns a ship name', () => {
      expect(new Ship()).toBeInstanceOf(Ship)
    })

    it('can set the colors', () => {
      const actual = new Ship({ colors: 'Spanish' })
      expect(actual.colors).toBe('Spanish')
    })

    it('randomizes the colors by default', () => {
      const actual = new Ship()
      expect(isColors(actual.colors)).toBe(true)
    })

    it('can set the ship’s role', () => {
      const actual = new Ship({ role: 'Man-of-War' })
      expect(actual.role).toBe('Man-of-War')
    })

    it('randomizes the ship’s role by default', () => {
      const actual = new Ship()
      expect(isShipRole(actual.role)).toBe(true)
    })

    it('requires a pirate ship to be a man-of-war', () => {
      const actual = new Ship({ colors: 'Pirate' })
      expect(actual.role).toBe('Man-of-War')
    })

    it('allows a man-of-war to be a privateer', () => {
      const actual = new Ship({ role: 'Man-of-War', privateer: true })
      expect(actual.privateer).toBe(true)
    })

    it('does not allow a merchantman to be a privateer', () => {
      const actual = new Ship({ role: 'Merchantman', privateer: true })
      expect(actual.privateer).toBe(false)
    })

    it('requires a pirate to be a privateer', () => {
      const actual = new Ship({ role: 'Man-of-War', colors: 'Pirate', privateer: false })
      expect(actual.privateer).toBe(true)
    })

    it('instantiates a dictionary of names', () => {
      const actual = new Ship()
      expect(actual.names).toEqual({})
    })

    it('can set the dictionary of names', () => {
      const actual = new Ship({ names: { french: 'La Concorde', pirate: 'Queen Anne’s Revenge' } })
      expect(actual.names.french).toBe('La Concorde')
      expect(actual.names.pirate).toBe('Queen Anne’s Revenge')
    })
  })

  describe('Instance method', () => {
    describe('getRollTableUUID', () => {
      const tests: Array<[string, Partial<ShipParams>, string]> = [
        ['Spanish merchantmen', { colors: 'Spanish', role: 'Merchantman' }, ShipNameTables.Spanish.Merchant],
        ['Spanish men-of-war', { colors: 'Spanish', role: 'Man-of-War' }, ShipNameTables.Spanish.War],
        ['British merchantmen', { colors: 'British', role: 'Merchantman' }, ShipNameTables.British.Merchant],
        ['British men-of-war', { colors: 'British', role: 'Man-of-War' }, ShipNameTables.British.War],
        ['French merchantmen', { colors: 'French', role: 'Merchantman' }, ShipNameTables.French.Merchant],
        ['French men-of-war', { colors: 'French', role: 'Man-of-War' }, ShipNameTables.French.War],
        ['Dutch merchantmen', { colors: 'Dutch', role: 'Merchantman' }, ShipNameTables.Dutch.Merchant],
        ['Dutch men-of-war', { colors: 'Dutch', role: 'Man-of-War' }, ShipNameTables.Dutch.War],
        ['pirate ships', { colors: 'Pirate', role: 'Man-of-War' }, ShipNameTables.Pirate]
      ]

      it.each(tests)('gets the correct table UUID for %s', (_label, params, expected) => {
        const instance = new Ship(params)
        expect(instance.getRollTableUUID()).toBe(expected)
      })

      it('gets the table UUID for religious Spanish ship names', () => {
        const instance = new Ship({ colors: 'Spanish' })
        expect(instance.getRollTableUUID('religious')).toBe(ShipNameTables.Spanish.Religious)
      })
    })
  })

  describe('Static methods', () => {
    describe('generate', async () => {
      it('generates a ship', async () => {
        const actual = await Ship.generate()
        expect(actual).toBeInstanceOf(Ship)
      })

      it('can set the colors', async () => {
        const actual = await Ship.generate({ colors: 'Spanish' })
        expect(actual.colors).toBe('Spanish')
      })

      it('can set the role', async () => {
        const actual = await Ship.generate({ role: 'Man-of-War' })
        expect(actual.role).toBe('Man-of-War')
      })

      it('generates a name for a British merchantman', async () => {
        const actual = await Ship.generate({ colors: 'British', role: 'Merchantman' })
        expect(actual.names).toEqual({ british: 'Salisbury' })
      })

      it('generates a name for a British man-of-war', async () => {
        const actual = await Ship.generate({ colors: 'British', role: 'Man-of-War' })
        expect(actual.names).toEqual({ british: 'Porphyrion' })
      })

      it('generates secular and religious names for a Spanish merchantman', async () => {
        const actual = await Ship.generate({ colors: 'Spanish', role: 'Merchantman' })
        expect(actual.names).toEqual({ spanish: 'Alondra', religious: 'Nuestra Señora del Coro' })
      })

      it('generates names for a pirate ship', async () => {
        const actual = await Ship.generate({ colors: 'Pirate', role: 'Man-of-War' })
        expect(actual.names).toEqual({ spanish: 'Alondra', religious: 'Nuestra Señora del Coro', pirate: 'Queen Anne’s Revenge' })
      })
    })
  })
})
