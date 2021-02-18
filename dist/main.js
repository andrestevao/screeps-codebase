var CommandCenterClass = require('./class.command.center');
var commandCenter = new CommandCenterClass();
module.exports.loop = function () {
    commandCenter.tick();
};
