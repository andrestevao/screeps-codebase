# My screeps codebase

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
