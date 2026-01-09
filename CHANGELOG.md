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
