# AdjutantAI - My screeps codebase

## "Adjutant"?
When i started playing [Screeps](https://screeps.com/), i started looking around for players codebases and i found the [Overmind](https://github.com/bencbartlett/Overmind) project, saw that most naming was based on Starcraft's Zerg race, and i figured i would name my stuff based on Starcraft's Terran Race! That's why i'm naming this project [Adjutant](https://starcraft.fandom.com/wiki/Adjutant).

## usage

* create a `.env` file, based on `.env.sample`, placing your branch name (in-game) and token
* available npm commands
  * `clean`: delete everything inside dist folder
  * `build`: build `.ts` files under `./src` to `.js` files under `./dist`
  * `send`: run `./utils/writeToServer.js` to send everything under `./dist` to your account (with the token) on the selected branch
  * `runAll`: run all above, in the presented sequence

## folder structure

* src
  * source typescript files
* dist
  * compiled javascript files
* utils
  * misc scripts 
* tests (to-do)
  * all tests
