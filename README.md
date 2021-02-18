# My screeps codebase

## usage

* create a `Gruntfile.js` file, based on `Gruntfile.sample.js`, placing your email and token
* available npm commands
  * `clean`: delete everything inside dist folder
  * `build`: build `.ts` files under `./src` to `.js` files under `./dist`
  * `send`: run grunt task that will send everything under `./dist` to your configured account (email+token) on the selected branch
  * `runAll`: run all above, in the presented sequence

## folder structure

* src
  * source typescript files
* dist
  * compiled javascript files
* tests (to-do)
  * all tests
