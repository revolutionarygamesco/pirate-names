# Pirate Name Generator

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/piratenames?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v14-informational?label=Foundry+version&style=for-the-badge)
![Test Status](https://img.shields.io/github/actions/workflow/status/revolutionarygamesco/piratenames/test.yml?label=Test+status&style=for-the-badge)
![License](https://img.shields.io/github/license/revolutionarygamesco/piratenames?style=for-the-badge)

This is a module for [Foundry VTT](https://foundryvtt.com/) that generates plausible,
random names for people and ships in the Caribbean during the Golden Age of Piracy.

* Generate masculine and feminine names for Spanish, English, French, Dutch, Scottish, Irish, and Welsh characters, following culturally-specific naming practices.
  * Spanish names include variations of Marian personal names (e.g., _Maria de los Angeles_) and two surnames (either of which can also be composite).
  * Half of Dutch surnames are replaced by patronyms.
  * Irish names are presented in Gaelic along with an Anglicized version that might be used in official records.
* Generate names for Spanish, British, French, and Dutch merchantmen and men-of-war, reflecting the unique ship-naming trends of each nation.
  * Commercial names are more likely to reflect economic ambitions (e.g., _Enterprise_, _Prosperity_, _Eurydice_, _Dove_), while martial names are more likely to represent more bellicose intentions (e.g., _Defiance_, _Victory_, _Agamemnon_, _Dragon_).
  * Completely separate tables for pirate ship names reflect themes of revenge with hints of blasphemy and gallows humor that pirates of the period were known for.

## API

### `generatePersonalName`

Generates a reasonable full name for the nationality and gender specified.

#### Signature

```typescript
type Nationality =
  'Akan'
  | 'Bantu'
  | 'Dutch'
  | 'English'
  | 'Fon'
  | 'French'
  | 'Igbo'
  | 'Irish'
  | 'Kalinago'
  | 'Mandinka'
  | 'Miskito'
  | 'Portuguese'
  | 'Scottish'
  | 'Spanish'
  | 'Taino'
  | 'Welsh'
  | 'Yoruba'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightened age.
type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

interface FamilyData {
  nationality: Nationality,
  size: number, // Number of children in immediate family
  name: string, // Only for Akan, Dutch, English, French, Irish, Mandinka, Portuguese, Scottish, Spanish, Welsh, and Yoruba families
  patriarch: string // Only for Bantu, Dutch, Igbo, and Kalinago families, and never with name. It's strictly either/or.
  anglicization: string, // Only for Irish families
  caste: 'Foro' | 'Nyamakala' | 'Jali' | 'Jakhanke' // Only for Mandinka families
  full: string, // Only for Spanish families
  other: { // Only for Portuguese families
    father: string, // Your father’s second surname.
    mother: string[] // Your mother’s surnames.
  }
}

interface BirthContextData {
  family: FamilyData,
  order: number, // Birth order; 1 for first-born, 2 for second, etc.
  twin: 1 | 2 | false, // 1 for senior twin, 2 for junior, false for not a twin
  weekday: Weekday, // Or Eke, Oye, Afor, or Nkwo for an Igbo name
  special: string // special birth circumstances; see below
}

interface PersonalNameParams {
  gender: Gender
  nationality: Nationality,
  birth: BirthContextData
}

interface PersonalNameForms {
  nationality: Nationality,
  full: string, // The full form of the name
  short: string, // Only for Spanish and Portuguese names; a common, shortened form
  personal: string, // The personal name, used in familiar settings
  [key: string]: string // Filled in using the titles map you pass in
}

interface Titles {
  [key: string]: string | { m: string, f: string }
}

async (
  params?: Partial<PersonalNameParams>,
  titles: Titles = { mister: { m: 'Mr.', f: 'Mrs.' } },
  whisper?: string[]
) => Promise<Array<Record<string, string>>>
```

#### Parameters

##### `params.gender`

Not all of these groups have gendered naming practices, but most of them do.
Note that it’s the _name_ that’s gendered. What relationship that has to the
person who bears it is something you’ll have to play to find out.

_Default:_ Randomizes, 50% masculine, 50% feminine.

#### `params.nationality`

The nationality that this name reflects. Not that it’s the _name_ that has a
nationality. What relationship that has to the person who bears it is something
you’ll have to play to find out.

_Default_: Randomizes by rolling on the **Nationality** table, reflecting the
demographics of the Caribbean at the beginning of the 18th century (c. 1700 CE).

#### `params.birth`

An object detailing circumstances of this person’s birth.

##### `params.birth.family`

The family context in which this person was named.

###### `params.birth.family.nationality`

The nationality that this family is enmeshed in.

_Default:_ Randomized.

###### `params.birth.family.size`

The number of children in the immediate family.

_Default:_ Randomized.

###### `params.birth.family.name`

The family name. This is only a valid option for Akan, Dutch, English, French,
Irish, Mandinka, Portuguese, Scottish, Spanish, Welsh, and Yoruba families.

Note that `name` and `patriarch` are mutually exclusive. No family can have
both. A family that has a `name` cannot have a `patriarch`.

_Default:_ Randomized.

###### `params.birth.family.patriarch`

The father’s name, used in patronymic naming traditions. This is only a valid
option for Bantu, Dutch, Igbo, and Kalinago families.

Note that `patriarch` and `name` are mutually exclusive. No family can have
both. A family that has a `patriarch` cannot have a `name`.

_Default:_ Randomized.

###### `params.birth.family.anglicization`

The Anglicization of the family name. This is only a valid option for
Irish families.

_Default:_ Randomized.

###### `params.birth.family.caste`

The caste that the family comes from. This is only a valid option for
Mandinka families.

_Default:_ Randomized, but it’s `Foro` 97% of the time.

###### `params.birth.family.full`

The full form of the family name. THis is only a valid option for
Spanish families.

_Default:_ Randomized.

##### `params.birth.order`

The birth order for the person being named. The first-born is `1`, the
second-born is `2`, and so on.

_Default:_ Randomized.

##### `params.birth.twin`

If this person is the elder of a pair of twins, set this to `1`. If they are
the younger of a pair of twins, set this to `2`. If they aren’t a twin at all
(by far the most common case), set this to `false`. And if you want to leave
it up to chance, set this to `undefined`.

_Default:_ Randomized.

##### `params.birth.weekday`

The day of the week on which this person was born. This is an important factor
in many West African naming traditions. Modern, English-language weekdays
(`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, and
`Saturday`) work in most cases, but not for the Igbo. The Igbo have a four-day
week, so you’ll have to supply one of their weekday names: `Eke`, `Oye`,
`Afor`, or `Nkwo`.

_Default:_ Randomized.

##### `params.birth.special`

A code indicating a special circumstance that accompanied this person’s birth.

| Culture(s)        | Code         | Meaning                                        |
|-------------------|--------------|------------------------------------------------|
| Akan              | `sickly`     | Born premature or sickly.                      |
| Akan              | `field`      | Born in the field.                             |
| Akan, Fon, Yoruba | `war`        | Born during a time of war.                     |
| Akan, Fon, Yoruba | `road`       | Born on the road.                              |
| Akan              | `fatherless` | The child’s father died before they were born. |
| Akan              | `happy`      | A child born under happy circumstances.        |
| Akan              | `loves`      | One who loves.                                 |
| Akan              | `great`      | Great one.                                     |
| Akan              | `forceful`   | Forceful.                                      |
| Fon               | `dry`        | Born during the dry season.                    |
| Fon               | `water`      | Born on the water.                             |
| Fon               | `conflict`   | Born in a time of family conflict.             |
| Fon               | `market`     | Born at the market.                            |
| Fon, Yoruba       | `facedown`   | Born facedown.                                 |
| Fon               | `day`        | Born during the day.                           |
| Fon               | `night`      | Born at night.                                 |
| Yoruba            | `postterm`   | Post-term birth.                               |
| Yoruba            | `caul`       | Born covered with caul.                        |
| Yoruba            | `motherless` | Mother died shortly after birth.               |
| Yoruba            | `crier`      | A small baby that cried a lot.                 |
| Yoruba            | `breech`     | Breech birth.                                  |
| Yoruba            | `knotted`    | Born with knotted hair or dreads.              |
| Yoruba            | `unbroken`   | Born with an unbroken membrane.                |
| Yoruba            | `festival`   | Born during an important festival.             |
| Yoruba            | `egungun`    | Born during the Egúngún festival.              |
| Yoruba            | `orisa`      | Born during Orisa festival.                    |
| Yoruba            | `traveling`  | Born while parents were out of town.           |
| Yoruba            | `overseas`   | Born overseas.                                 |


_Default:_ Randomized.

#### `titles`

Different naming traditions have different ways of breaking up names for formal
address. This dictionary supplies titles you’s like to see used with the
generated name. Each entry can be either a string (e.g., `{ captain: 'Captain' )`)
or a gendered pair (e.g., `{ mister: { m: 'Mr.', f: 'Mrs.' }`).

As an example, let’s suppose that you call the following:

```typescript
const names = await generatePersonalName(
  { nationality: 'Welsh', gender: 'Masculine' },
  {
    captain: 'Captain',
    mister: { m: 'Mr.', f: 'Mrs.' },
    lord: { m: 'Lord', f: 'Lady' }
  }
)
```

And you just so happen to roll up _William Kidd_. Then the `forms` element
of that name would be:

```typescript
const forms = {
  full: 'William Kidd',
  personal: 'William',
  captain: 'Captain Kidd',
  mister: 'Mr. Kidd',
  lord: 'Lord Kidd'
}
```

_Default:_ `{ mister: { m: 'Mr.', f: 'Mrs.' }`

#### `whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

#### Returns

The return value is an array of objects. Usually there’s only one object, but
Irish names return two: one for the Gaelic name they use in their own community,
and one for the English name they use for official business. The return object
is very similar to the `params` passed in, so rather than repeat everything,
here’s what’s different.

##### `name.forms`

This is a dictionary of variations of the name.

###### `name.forms.full`

The full name.

###### `name.forms.short`

A shorter form of the name. Included only for Spanish and Portuguese names.

###### `name.forms[key]`

The name rendered with each of the titles you requested in `titles`.

##### `name.day`

A name element based on the day of the week on which this person was born.
Included only in Fon and Igbo names.

##### `name.circumstance`

A name element based on some special circumstance of birth. Included only
for Akan, Fon, and Yoruba names.

##### `name.order`

A name element based on birth order. Included only for Akan names.

##### `name.twin`

A name element based on twin status. Included only for Akan names.

##### `name.santu`

A _santu_ name, using the Bantu phoneticization of a Portuguese saint,
indicating that this person is a Catholic or comes from a community of
Bantu Catholics. Included only for Bantu names.

##### `name.initiation`

A name given to Bantu who have been initiated, indicating a devotion to
traditional Bantu culture. Included only for Bantu names.

##### `name.surnames`

The full string of surnames that this person uses. Included only for
Portuguese names.

### `generateShipName`

Generates a reasonable ship name for the nationality specified.

#### Signature

```typescript
type Colors = 'Spanish' | 'British' | 'French' | 'Dutch' | 'Pirate'
type ShipRole = 'Merchantman' | 'Man-of-War'

interface ShipParams {
  colors: Colors
  role: ShipRole
  privateer: boolean
  names: Record<string, string>
}

async (
  params?: Partial<ShipParams>,
  whisper?: string[]
) => Promise<Record<string, string>>
```

#### Parameters

##### `params`

An object defining certain elements about the ship to name.

###### `params.colors`

Sets the colors that the ship is sailing under.

_Default:_ Roll on the _Colors_ roll table included in the module. This
reflects the relative dominance of each faction in the Caribbean during the
Golden Age of Piracy.

##### `params.role`

If the ship is a merchant vessel (`Merchantman`) or built for naval combat
(`Man-of-War`).

_Default_: Randomized, but overwhelmingly `Merchantman`.

##### `params.privateer`

If the ship is a privateer vessel. A `Merchantman` can never be a privateer, so
if you set `{ role: 'Merchantman', privateer: true }`, then `privateer` will be
set to `false`. Similarly, _all_ pirate vessels are privateers, so
`{ colors: 'Pirate', privateer: false }` will set `privateer` to `true`. It’s
for `Man-of-War` ships flying under other colors where this distinction is
meaningful.

_Default_: Randomized.

##### `params.names`

A dictionary of names that this ship uses (or has used). Usually there’s only
one, keyed to a lower-case version of the colors. For example,
`{ colors: 'British' }` will return a key for `british`. There are two major
exceptions, though:

* Spanish ships of this period had two names: an official, religious name
  (which you will find keyed under `religious`), and a secular name that was
  more often used in day-to-day business (keyed under `spanish`).
* Pirate ships almost never start off as pirate ships, so they have other
  names from their former life as a legitimate merchantman.

_Default_: `undefined`

##### `whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `[]`

#### Returns

A dictionary of names structured just like `params.names`, but with the
generated names now filled in.

### `openGeneratePersonalNameDialog`

This method opens a dialog that allows a user to select the parameters for generating a person’s name.

#### Signature

```typescript
async (onComplete?: (
  n: Nationality | 'Random Person' | 'Random Pirate',
  g: Gender | 'Random'
) => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Name** button.

_Default:_ By default, we provide a method that gathers the user’s input from
the form, passes it to `generatePersonalName` and whispers it to the user. In most
cases, this is the expected behavior, but you can override this if necessary.

### `openGenerateShipNameDialog`

This method opens a dialog that allows a user to select the parameters for generating a ship’s name.

#### Signature

```typescript
async (onComplete?: (c: Colors | 'Random', r: ShipRole | 'Random') => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Name** button.

_Default:_ By default, we provide a method that gathers the user’s input from
the form, passes it to `generateShipName` and whispers it to the user. In most
cases, this is the expected behavior, but you can override this if necessary.