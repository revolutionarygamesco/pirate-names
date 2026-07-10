### v1.5.0
* Add Kalinago, Taíno, and Miskito names.

### v1.4.2
* Move **Pirate Nationalities** to a d100 table. This allows us to push African
  names up to the top of the historically-estimated range (30%) with more
  fine-tuning for the less common options that are too flavorful to drop
  entirely (Spanish, French, Dutch) and keeping the Celtic options (Scottish,
  Irish, Welsh) sufficiently high to reflect Jacobite tendencies.

### v1.4.1
* Fix nationality tables by moving older table to **European Nationalities**
  and adding a new **African Nationalities** table (based on data from
  [Slave Voyages](https://www.slavevoyages.org/)). The new top-level
  **Nationalities** table has a 60% chance of rolling on 
  **African Nationalities** and a 40% chance of rolling on
  **European Nationalities**. **Pirate Nationalities** has also been fixed by
  reducing chances of existing European tables to add a 25% chance of rolling 
  on **African Nationalities**. That’s a defensible number, but honestly on the
  low side, but pumping it up to the higher end of the range at 30% would push
  out Spanish, Dutch, French, Irish, and/or Welsh pirates completely.

### v1.4.0
* Add Akan, Bantu, Fon, Igbo, Mandinka, and Yoruba names.

### v1.3.0
* Add Portuguese personal names
* Fix anachronistic British flag
* Correction to documentation
* Verified in Foundry 14

### v1.2.1
* Misspelled the surname Williams as “Willaims.” Yikes!
* Removed some errant logging.

### v1.2.0
* Moved from extraction to keeping the original form of compendium content under version control as YAML files.
* Add Scottish, Irish, and Welsh personal names.
* Expanded content throughout rolltables.
* Separate dialogs for personal names and ship names.
  * `openGenerateNameDialog` is now a deprecated alias for `openGeneratePersonalNameDialog` to maintain backwards compatability.

### 1.1.0
* Add 36 new rollable tables for generating pirate ship names (bringing total to 212).
* A **Generate Pirate Ship Name** macro that rolls a random pirate ship name and whispers it to the user.
* New API method:
* New, documented API methods:
  * `generatePirateShipName` for generating a pirate ship name.

### 1.0.1
* We now extract compendium data using the Foundry VTT CLI, commit that to git, and add a packing step (again using the Foundry VTT CLI) to our build process.

### 1.0.0
* 176 rollable tables for generating personal and ship names from the major European powers active in the Caribbean during the Golden Age of Piracy (the Spanish Empire, the British Empire, the Kingdom of France, and the Dutch West India Company).
* A **Generate Name** macro that provides a UI for users to generate names for people and ships, which are whispered to that user.
* Documented API methods:
    * `generateGivenName` for generating masculine or feminine given names from any of the four provided nations.
    * `generateSurname` for generating a single surname from any of the four provided nations.
    * `generateName` for generating a full name from any of the four provided nations (including culturally-specific variations and forms).
    * `generateShipName` for generating a merchant or naval ship name following the naming customs of one of the four provided nations.
    * `openGenerateNameDialog` for rendering the **Generate Name** UI
    * `rollTable` to allow other methods to reuse this module's method for returning a result from a rollable table.
