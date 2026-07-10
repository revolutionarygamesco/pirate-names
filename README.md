# Pirate Name Generator

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/piratenames?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v13-informational?label=Foundry+version&style=for-the-badge)
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

### `generateGivenName`

Rolls on the appropriate roll table to find a random given name that fits the
nationality and gender provided.

#### Signature

```typescript
type Nationality = 'Dutch' | 'English' | 'Fon' | 'French' | 'Igbo' | 'Irish' | 'Kalinago' | 'Mandinka' | 'Portuguese' | 'Scottish' | 'Spanish' | 'Welsh' | 'Yoruba'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightened age.

interface GenerateGivenNameOptions {
  nation: Nationality
  gender: Gender
  whisper?: string[]
}

async (options: GenerateGivenNameOptions) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy. If it comes up with a nationality that uses something
more complex than given names (e.g., Akan or Taíno), it will roll again until
it comes up with an appropriate option.

#### `options.gender`

Sets the gender of the name to be generated.

_Default_: Roll on the _Gender_ roll table included in the module, with equal
chances of getting `Masculine` or `Feminine`.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

### `generateSurname`

Rolls on the appropriate roll table to find a random surname from the
nationality provided.

#### Signature

```typescript
type Nationality = 'Dutch' | 'English' | 'French' | 'Irish' | 'Portuguese' | 'Scottish' | 'Spanish' | 'Welsh'

interface GenerateSurameOptions {
  nation: Nationality
  whisper?: string[]
}

async (options: GenerateSurameOptions) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

In Spanish, people use two surnames (from both their father and their mother).
While `generateName` returns a person’s full name using this rule, this method
returns just one surname.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy. If it comes up with a nationality that doesn’t use
surnames, it will roll again until it comes up with an appropriate option.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

### `generateName`

Generates a reasonable full name for the nationality and gender specified.

_Mostly_ this is a matter of calling `generateGivenName`, then
`generateSurname`, and concatenating the result. The exceptions are:

* In Spanish, each of a person’s two surnames has a 30% chance of being a
  composite surname (two surnames separated by a hyphen), meaning that the
  full surname could include anywhere between 2 and 4 names.
* In French, a number of masculine names can be preceded by _Jean_ to form a
  compound name (e.g., `Jean-Luc`, `Jean-Paul`). If one of these names is
  drawn, there’s a 50% chance that we prepend _Jean-_ to it.
* In Dutch, there’s a 50% chance that instead of drawing a surname, we create a
  patronymic by drawing a masculine given name and appending _szoon_ to
  masculine names or _sdochter_ to feminine names.
* Irish names are presented in Gaelic with its Anglicization in parentheses.
  During this period, the British Empire was attempting to suppress Gaelic
  language and traditions, so Gaelic names were often used in their own
  communities, though official records would use Anglicized forms.

#### Signature

```typescript
type Nationality = 'Spanish' | 'English' | 'French' | 'Dutch' | 'Scottish' | 'Irish' | 'Welsh' | 'Akan' | 'Bantu' | 'Fon' | 'Igbo' | 'Mandinka' | 'Yoruba'
type Gender = 'Masculine' | 'Feminine' // It was a less enlightened age.
type Weekday = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
interface BirthCircumstances {
  weekday: Weekday
  order: number | 'last'
  twin: 1 | 2 | false
  special: string
  caste: string
}

async (
  nationality?: Nationality,
  gender?: Gender,
  whisper?: string[],
  circumstances?: Partial<BirthCircumstances>
) => Promise<string>
```

#### Parameters

##### `options.nation`

Sets the nationality that the name should be taken from.

_Default:_ Roll on the _Nationalities_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy.

#### `options.gender`

Sets the gender of the name to be generated.

_Default_: Roll on the _Name Genders_ roll table included in the module,
with equal chances of getting `Masculine` or `Feminine`.

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

#### `options.circumstances`

Several West African naming traditions include special names reserved for those
born under specific circumstances. This object gives you the opportunity to
specify those as needed; otherwise, they are randomized.

##### `options.circumstances.weekday`

The day of the week on which this person was born. This is an important part of
Akan, Fon, and Igbo names.

_Default_: `undefined`

##### `options.circumstances.order`

Birth order (`1` for the first-born, `2` for the second-born, and so on, up to
`13`). This is used in Akan names, while `last` can also be a part of a Bantu
name.

_Default_: `undefined`

##### `options.circumstances.twin`

Akan, Bantu, Fon, and Yoruba all have special names reserved for the first and
second twin. `1` indicates the older twin, `2` the younger twin, and `false`
that this person is _not_ a twin. Leave undefined to leave it up to chance.

_Default_: `undefined`

##### `options.circumstances.special`

Either `null` or a string code specifying a special circumstance that would be
commemorated in the naming traditions of certain cultures.

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

_Default_: `undefined`

##### `options.circumstances.caste`

Only relevant to Mandinka names. Can be `undefined` or any of the following:

| Caste     | Chance | Notes                                                                                                                         |
|-----------|--------|-------------------------------------------------------------------------------------------------------------------------------|
| Foro      | 97%    | Freeborn, encompassing farmers, warriors, and nobility alike.                                                                 |
| Jakhanke  | 1%     | The Islamic priestly class.                                                                                                   |
| Jali      | 1%     | The griots — storytellers, praise singers, historians, and musicians.                                                         |
| Nyamakala | 1%     | Artisans and other talented people, though the only special names designated in this module are for blacksmiths specifically. |

If `undefined`, a caste is chosen at rndom, using the odds listed above.

_Default_: `undefined`

### `generateShipName`

Generates a reasonable ship name for the nationality specified.

* For Spanish ships, we return an instance of the `SpanishShipName`
  interface. All other nationalities return a string.

#### Signature

```typescript
type Colors = 'Spanish' | 'British' | 'French' | 'Dutch'

interface SpanishShipName {
  religious: string
  secular: string
}

interface GenerateShipNameOptions {
  colors?: Colors
  martial?: boolean
  whisper?: string[]
}

async (options: GenerateShipNameOptions) => Promise<SpanishShipName | string>
```

#### Parameters

##### `options.colors`

Sets the nationality that the name should be taken from.

_Default:_ Roll on the _Colors_ roll table included in the module. This
reflects the relative dominance of each nation in the Caribbean during the
Golden Age of Piracy.

#### `options.martial`

If `true`, we use the man-of-war roll tables, which are more likely to return
names related to warfare or other martial pursuits. Otherwise, the ship is
named as a civilian ship, with names that are more likely to be related to
trade and commerce.

_Default_: `false`

#### `options.whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `undefined`

### `generatePirateShipName`

Generates a pirate ship name.

#### Signature

```typescript
async (whisper: string[] = []) => Promise<string>
```

#### Parameters

#### `whisper`

A string of user IDs. If provided, a message will be whispered to these users
with the generated name.

_Default_: `[]`

### `openGeneratePersonalNameDialog`

This method opens a dialog that allows a user to select the parameters for generating a person’s name.

#### Signature

```typescript
async (onComplete?: (nation: string, type: string) => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Name** button.

_Default:_ By default, we provide a method that gathers the user’s input from
the form, passes it to `generateName`, and whispers it to the user. In most
cases, this is the expected behavior, but you can override this if necessary.

### `openGenerateShipNameDialog`

This method opens a dialog that allows a user to select the parameters for generating a ship’s name.

#### Signature

```typescript
async (onComplete?: (c: Colors | 'Pirate' | 'Random', t: string) => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Name** button.

_Default:_ By default, we provide a method that gathers the user’s input from
the form, passes it to either `generateShipName` or `generatePirateShipName`
(depending on the value of `c`), and whispers it to the user. In most cases,
this is the expected behavior, but you can override this if necessary.