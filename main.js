const spawnsRoutine = require('./routines.spawns');
const creepsRoutine = require('./routines.creeps');

module.exports.loop = () => {
  spawnsRoutine();
  creepsRoutine();
}
