//CommandCenter = main global object that contains
//all info about player colony, based on the spawns
//(mainly to avoid parsing everything all the time)
const CommandCenter = require('./class.command.center');
let commandCenter = new CommandCenter();

module.exports.loop = () => {

  commandCenter.tick();

}
