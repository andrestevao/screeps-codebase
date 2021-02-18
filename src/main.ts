const CommandCenterClass = require('./class.command.center');
const commandCenter = new CommandCenterClass();

module.exports.loop = () => {

  commandCenter.tick();

}
